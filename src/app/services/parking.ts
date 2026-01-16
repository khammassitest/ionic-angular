import { Injectable } from '@angular/core';
import { Parking } from '../models/parking.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  parkings: Parking[] = [
    { id: 'p1', name: 'Parking Centre Ville', location: 'Tunis', totalSpots: 50, availableSpots: 20 },
    { id: 'p2', name: 'Parking Mall', location: 'Tunis', totalSpots: 30, availableSpots: 10 }
  ];

  constructor() {}

  getParkings(): Parking[] {
    return this.parkings;
  }

  getParkingById(id: string): Parking | undefined {
    return this.parkings.find(p => p.id === id);
  }
}
