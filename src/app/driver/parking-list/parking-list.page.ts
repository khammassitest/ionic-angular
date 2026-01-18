import { Component, inject, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Auth, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.page.html',
  styleUrls: ['./parking-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ParkingListPage implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth); 
  private router = inject(Router); 
  
  parkings$: Observable<any[]> | undefined;

  constructor() {
    addIcons({ logOutOutline }); 
  }

  ngOnInit() {
    const parkingRef = collection(this.firestore, 'parkings');
    this.parkings$ = collectionData(parkingRef, { idField: 'id' });
  }
  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login'], { replaceUrl: true }); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }
}