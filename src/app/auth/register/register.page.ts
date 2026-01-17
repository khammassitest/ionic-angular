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
import { personOutline, mailOutline, lockClosedOutline, callOutline, keyOutline } from 'ionicons/icons';

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
    addIcons({ personOutline, mailOutline, lockClosedOutline, callOutline, keyOutline });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async register() {
    if (this.email && this.password && this.name) {
      try {
        this.authService.register(
          this.email,
          this.password,
          this.role,
          this.name,
          this.phone
        );
        
        console.log('Inscription réussie !');
        this.router.navigate(['/login']); 
      } catch (err: any) {
        console.error(err);
        this.error = "Erreur d'inscription: " + err.message;
      }
    } else {
      this.error = 'Veuillez remplir tous les champs obligatoires (Nom, Email, Mot de passe)';
    }
  }
}