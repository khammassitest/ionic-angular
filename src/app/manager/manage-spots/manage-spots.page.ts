import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-manage-spots',
  templateUrl: './manage-spots.page.html',
  styleUrls: ['./manage-spots.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ManageSpotsPage {
  spots = [
    { id: 'A1', status: 0 }, { id: 'A2', status: 1 }, { id: 'A3', status: 0 },
    { id: 'A4', status: 0 }, { id: 'A5', status: 1 }, { id: 'A6', status: 1 },
    { id: 'A7', status: 0 }, { id: 'A8', status: 0 }, { id: 'A9', status: 0 }
  ];
}