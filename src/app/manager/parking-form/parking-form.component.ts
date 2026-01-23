import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonButton, IonInput, IonTextarea, IonDatetime, IonFooter, ModalController, 
  IonDatetimeButton, IonModal, IonLabel 
} from '@ionic/angular/standalone';
import { ParkingService } from '../../services/parkingService';
import { Parking } from '../../models/parking.model';

@Component({
  selector: 'app-parking-form-modal',
  standalone: true,
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss'],
  imports: [
    CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButtons, IonButton, IonInput, IonTextarea,
    IonDatetime, IonDatetimeButton, IonModal, IonFooter, IonLabel
  ]
})
export class ParkingFormComponent implements OnInit {
  @Input() parkingId?: string;

  private fb = inject(FormBuilder);
  private parkingService = inject(ParkingService);
  private modalCtrl = inject(ModalController);

  isEdit = false;

  form = this.fb.group({
    nom: ['Parking Test', [Validators.required]],
    description: ['Description du parking'],
    ville: ['Tunis', Validators.required],
    codePostal: [2000, Validators.required],
    prix: [1, Validators.required],
    places: [10, [Validators.required, Validators.min(1)]],
    dateOpen: ['08:00', Validators.required],
    dateClose: ['22:00', Validators.required]
  });

  ngOnInit() {
    if (this.parkingId) {
      this.isEdit = true;
      this.parkingService.getParkingById(this.parkingId).subscribe((parking) => {
        if (parking) this.form.patchValue(parking);
      });
    }
  }

  async submit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();
    const data: Parking = {
      nom: formValue.nom!,
      description: formValue.description || '',
      ville: formValue.ville!,
      codePostal: Number(formValue.codePostal),
      prix: Number(formValue.prix),
      places: Number(formValue.places),
      dateOpen: formValue.dateOpen!,
      dateClose: formValue.dateClose!
    };
    
    try {
      if (this.isEdit && this.parkingId) {
        await this.parkingService.updateParking(this.parkingId, data);
      } else {
        await this.parkingService.addParking(data);
      }
      this.modalCtrl.dismiss();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}