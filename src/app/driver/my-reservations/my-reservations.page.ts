import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MyReservationsPage implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  res$: Observable<any[]> = of([]);

  ngOnInit() {
    user(this.auth).subscribe(u => {
      if (u) {
        const q = query(collection(this.firestore, 'reservations'), where('driverId', '==', u.uid));
        this.res$ = collectionData(q);
      }
    });
  }
}