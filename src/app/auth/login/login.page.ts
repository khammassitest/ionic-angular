import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonItem, IonButton, IonInput, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, keyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonItem, IonButton, IonInput, IonIcon, 
    FormsModule, CommonModule, RouterModule
  ]
})
export class LoginPage {
  email = '';
  password = '';
  error = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, keyOutline });
  }

  async login() {
    this.error = '';
    try {
      const userData: any = await this.authService.login(this.email, this.password);
      
      if (userData && userData.role) {
        console.log('Connexion réussie ! Role:', userData.role);
        if (userData.role === 'DRIVER') {
          this.router.navigate(['/parking-list']);
        } else if (userData.role === 'MANAGER') {
          this.router.navigate(['/dashboard']);
        }
      }
    } catch (err: any) {
      this.error = "Email ou mot de passe incorrect";
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    console.log('Mot de passe oublié');
  }
}