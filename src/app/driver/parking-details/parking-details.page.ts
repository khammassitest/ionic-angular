import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  doc,
  docData,
  collection,
  query,
  where,
  getDocs,
  runTransaction
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Parking } from '../../models/parking.model';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.page.html',
  styleUrls: ['./parking-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ParkingDetailsPage implements OnInit {

  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private toast = inject(ToastController);

  parking$!: Observable<Parking>;
  id!: string;

  hasActiveReservation = false;
  isProcessing = false;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    const parkingRef = doc(this.firestore, `parkings/${this.id}`);
    this.parking$ = docData(parkingRef, { idField: 'id' }) as Observable<Parking>;

    this.checkActiveReservation();
  }

  async checkActiveReservation() {
    const user = this.auth.currentUser;
    if (!user) return;

    const q = query(
      collection(this.firestore, 'reservations'),
      where('parkingId', '==', this.id),
      where('driverId', '==', user.uid),
      where('status', '==', 'CONFIRMED')
    );

    const snap = await getDocs(q);
    this.hasActiveReservation = !snap.empty;
  }

  async reserver() {
    if (this.isProcessing || this.hasActiveReservation) return;
    const user = this.auth.currentUser;
    if (!user) return;

    this.isProcessing = true;

    const parkingRef = doc(this.firestore, `parkings/${this.id}`);
    const reservationsRef = collection(this.firestore, 'reservations');

    try {
      await runTransaction(this.firestore, async (transaction) => {
        const snap = await transaction.get(parkingRef);
        if (!snap.exists()) throw 'Parking introuvable';

        const parking = snap.data() as Parking;
        if (parking.places <= 0) throw 'Aucune place disponible';

        transaction.update(parkingRef, {
          places: parking.places - 1
        });

        const resRef = doc(reservationsRef);
        transaction.set(resRef, {
          parkingId: this.id,
          driverId: user.uid,
          status: 'CONFIRMED',
          createdAt: new Date().toISOString()
        });
      });

      this.hasActiveReservation = true;

      (await this.toast.create({
        message: 'Réservation confirmée 🚗',
        duration: 3000,
        color: 'success'
      })).present();

    } catch (err: any) {
      (await this.toast.create({
        message: err,
        duration: 3000,
        color: 'danger'
      })).present();
    } finally {
      this.isProcessing = false;
    }
  }

  async quitter() {
    if (this.isProcessing || !this.hasActiveReservation) return;
    const user = this.auth.currentUser;
    if (!user) return;

    this.isProcessing = true;

    try {
      const parkingRef = doc(this.firestore, `parkings/${this.id}`);

      const q = query(
        collection(this.firestore, 'reservations'),
        where('parkingId', '==', this.id),
        where('driverId', '==', user.uid),
        where('status', '==', 'CONFIRMED')
      );

      const snap = await getDocs(q);
      if (snap.empty) return;

      const reservationDoc = snap.docs[0];

      await runTransaction(this.firestore, async (transaction) => {
        const parkingSnap = await transaction.get(parkingRef);
        if (!parkingSnap.exists()) throw 'Parking introuvable';

        const parking = parkingSnap.data() as Parking;

        transaction.update(parkingRef, {
          places: parking.places + 1
        });

        transaction.update(reservationDoc.ref, {
          status: 'FINISHED',
          finishedAt: new Date().toISOString()
        });
      });

      this.hasActiveReservation = false;

      (await this.toast.create({
        message: 'Sortie enregistrée ✅',
        duration: 3000,
        color: 'success'
      })).present();

    } finally {
      this.isProcessing = false;
    }
  }
}
