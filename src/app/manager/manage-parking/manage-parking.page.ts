import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ParkingService } from '../../services/parkingService'; 
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonFab, IonFabButton,
  IonSpinner, IonAvatar, IonNote, IonText 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  add, locationSharp, trashOutline, createOutline, 
  cashOutline, timeOutline, checkmarkCircle, alertCircle, locationOutline 
} from 'ionicons/icons';
import { Parking } from 'src/app/models/parking.model';

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
  parkings$: Observable<Parking[]>;

  constructor() {
    addIcons({
      locationOutline, locationSharp, cashOutline, timeOutline, 
      createOutline, trashOutline, add, checkmarkCircle, alertCircle
    });
    this.parkings$ = this.parkingService.getParkings();
  }

  editParking(id?: string) {
    console.log('Navigation vers modification:', id || 'Nouveau Parking');
  }

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