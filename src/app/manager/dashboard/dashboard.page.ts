import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router'; 
import { addIcons } from 'ionicons';
import { 
  logOutOutline, businessOutline, carSportOutline, 
  statsChartOutline, carOutline, chevronForwardOutline 
} from 'ionicons/icons';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DashboardPage implements OnInit {

  private firestore = inject(Firestore);
  totalParkings: number = 0;
  totalPlaces: number = 0;

  constructor(private router: Router) { 
    addIcons({ 
      'car-outline': carOutline,
      'stats-chart-outline': statsChartOutline,
      'business-outline': businessOutline,
      'log-out-outline': logOutOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'car-sport-outline': carSportOutline
    });
  }

  ngOnInit() {
    this.loadParkingStats();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goToManageParking() {
    this.router.navigate(['/manage-parking']);
  }

  goEditProfile() {
    this.router.navigate(['/profile']);
  }

  private loadParkingStats() {
    const parkingsRef = collection(this.firestore, 'parkings');
    collectionData(parkingsRef, { idField: 'id' })
      .pipe(
        map((parkings: any[]) => {
          this.totalParkings = parkings.length;
          // Sum of places for all parkings
          this.totalPlaces = parkings.reduce((acc, p) => acc + (p.places || 0), 0);
        })
      )
      .subscribe();
  }
}
