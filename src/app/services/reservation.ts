import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: Reservation[] = [];

  constructor() {}

  createReservation(reservation: Reservation) {
    this.reservations.push(reservation);
  }

  getReservationsByUser(userId: string): Reservation[] {
    return this.reservations.filter(r => r.userId === userId);
  }
}
