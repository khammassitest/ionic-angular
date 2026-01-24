import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, 
  IonButton, IonIcon, IonFab, IonFabButton, IonSpinner, IonAvatar, 
  IonPopover, IonList, IonItem, IonLabel, ModalController, AlertController
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { 
  add, ellipsisVertical, createOutline, trashOutline, locationOutline 
} from 'ionicons/icons';

import { ParkingService } from '../../services/parkingService';
import { Parking } from 'src/app/models/parking.model';
import { ParkingFormComponent } from '../parking-form/parking-form.component';

@Component({
  selector: 'app-manage-parking',
  templateUrl: './manage-parking.page.html',
  styleUrls: ['./manage-parking.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon, 
    IonFab, 
    IonFabButton, 
    IonSpinner, 
    IonAvatar, 
    IonPopover, 
    IonList, 
    IonItem, 
    IonLabel
    ]
})
export class ManageParkingPage {
  private parkingService = inject(ParkingService);
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);

  parkings$: Observable<Parking[]> = this.parkingService.getParkings();

  constructor() {
    addIcons({ add, ellipsisVertical, createOutline, trashOutline, locationOutline });
  }

  async editParking(id?: string) {
    const modal = await this.modalCtrl.create({
      component: ParkingFormComponent,
      componentProps: { parkingId: id },
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.9]
    });
    await modal.present();
  }

  async deleteParking(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer ce parking ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: async () => {
            await this.parkingService.deleteParking(id);
          }
        }
      ]
    });
    await alert.present();
  }

}