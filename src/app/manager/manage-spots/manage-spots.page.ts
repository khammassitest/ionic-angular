import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-manage-spots',
  templateUrl: './manage-spots.page.html',
  styleUrls: ['./manage-spots.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ManageSpotsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
