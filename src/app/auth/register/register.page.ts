import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonLabel, IonItem, IonButton, IonInput, 
  IonSelect, IonSelectOption, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';  
import { personOutline, mailOutline, lockClosedOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonLabel, IonItem, IonButton, IonInput, 
    IonSelect, IonSelectOption, IonIcon, CommonModule, FormsModule
  ]
})
export class RegisterPage {
  name = ''; 
  email = '';
  phone = ''; 
  password = '';
  role = 'DRIVER';
  error = '';

  constructor(private authService: AuthService, private router: Router) {
     
    addIcons({ personOutline, mailOutline, lockClosedOutline, callOutline });
  }

   
  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.email && this.password && this.name) {
      this.authService.register(this.email, this.password, this.role);
      this.router.navigate(['/login']); 
    } else {
      this.error = 'Veuillez remplir tous les champs obligatoires';
    }
  }
}