import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router'; 
import { addIcons } from 'ionicons';
import { logOutOutline, businessOutline, carSportOutline, statsChartOutline, carOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DashboardPage implements OnInit {

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

  ngOnInit() {}

  logout() {
    this.router.navigate(['/login']);
  }

  goToManageParking() {
    this.router.navigate(['/manage-parking']);
  }

  goEditProfile() {
    this.router.navigate(['/profile']);
  }
}