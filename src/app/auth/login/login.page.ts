import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { mailOutline, keyOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonButton, IonInput, IonIcon],
  providers: [AuthService]
})
export class LoginPage {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ mailOutline, keyOutline, lockClosedOutline });
  }

  login() {
    if (this.authService.login(this.email, this.password)) {
      const role = this.authService.getRole();
      if (role === 'DRIVER') {
        this.router.navigate(['/driver/parking-list']);
      } else {
        this.router.navigate(['/manager/dashboard']);
      }
    } else {
      this.error = 'Email ou mot de passe incorrect';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    console.log('Forgot password clicked');
  }
}