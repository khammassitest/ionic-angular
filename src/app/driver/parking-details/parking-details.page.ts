import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData, addDoc, collection } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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

  parking$: Observable<any> | undefined;
  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const pDoc = doc(this.firestore, `parkings/${this.id}`);
      this.parking$ = docData(pDoc);
    }
  }

  async reserver() {
    const user = this.auth.currentUser;
    if (user && this.id) {
      await addDoc(collection(this.firestore, 'reservations'), {
        parkingId: this.id,
        driverId: user.uid,
        date: new Date().toISOString(),
        status: 'En attente'
      });
      const t = await this.toast.create({ message: 'Réservation envoyée !', duration: 2000, color: 'success' });
      t.present();
    }
  }
}