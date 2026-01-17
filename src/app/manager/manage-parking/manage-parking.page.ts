import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, locationOutline, trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-manage-parking',
  templateUrl: './manage-parking.page.html',
  styleUrls: ['./manage-parking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ManageParkingPage {
  parkings = [
    { id: 1, name: 'Parking Sidi Bou Said', price: '2.0 DT/h', location: 'Tunis' },
    { id: 2, name: 'Parking Marsa Center', price: '1.5 DT/h', location: 'La Marsa' }
  ];

  constructor() {
    addIcons({ add, locationOutline, trashOutline, createOutline });
  }
}