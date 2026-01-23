import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ParkingService } from '../../services/parkingService';
import { Parking } from 'src/app/models/parking.model';

import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonFab, IonFabButton,
  IonSpinner, IonAvatar, IonNote, IonText, ModalController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  add, locationSharp, trashOutline, createOutline,
  cashOutline, timeOutline, checkmarkCircle, alertCircle, locationOutline
} from 'ionicons/icons';

/* 👉 Import the modal component */
import { ParkingFormComponent } from '../parking-form/parking-form.component';

@Component({
  selector: 'app-manage-parking',
  templateUrl: './manage-parking.page.html',
  styleUrls: ['./manage-parking.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonButton, IonIcon, IonFab, IonFabButton,
    IonSpinner, IonAvatar, IonNote, IonText
  ]
})
export class ManageParkingPage {

  private parkingService = inject(ParkingService);
  private modalCtrl = inject(ModalController);

  parkings$: Observable<Parking[]> = this.parkingService.getParkings();

  constructor() {
    addIcons({
      locationOutline,
      locationSharp,
      cashOutline,
      timeOutline,
      createOutline,
      trashOutline,
      add,
      checkmarkCircle,
      alertCircle
    });
  }

  /* ✅ ADD + EDIT via modal */
  async editParking(id?: string) {
    const modal = await this.modalCtrl.create({
      component: ParkingFormComponent,
      componentProps: {
        parkingId: id
      },
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.9
    });

    await modal.present();
  }

  /* ✅ DELETE */
  async deleteParking(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce parking ?')) {
      try {
        await this.parkingService.deleteParking(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  }

  viewParking(id: string) {
    console.log('Voir détails:', id);
  }
}
