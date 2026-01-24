import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$!: Observable<any>;

  constructor() {
    addIcons({ personCircleOutline }); // Register the icon
  }

  ngOnInit() {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    const userRef = doc(this.firestore, `users/${uid}`);
    this.user$ = docData(userRef);
  }
}
