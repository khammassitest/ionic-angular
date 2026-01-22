import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Parking } from '../models/parking.model';


@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private collectionName = 'parkings';

  constructor(private firestore: Firestore) {}

  getParkings(): Observable<Parking[]> {
    const parkingCollection = collection(this.firestore, this.collectionName);
    return collectionData(parkingCollection, { idField: 'id' }) as Observable<Parking[]>;
  }

  getParkingById(id: string): Observable<Parking> {
    const parkingDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(parkingDoc, { idField: 'id' }) as Observable<Parking>;
  }

  async addParking(parking: Parking): Promise<void> {
    const parkingCollection = collection(this.firestore, this.collectionName);
    await addDoc(parkingCollection, parking);
  }

  async updateParking(id: string, data: Partial<Parking>): Promise<void> {
    const parkingDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await updateDoc(parkingDoc, data);
  }

  async deleteParking(id: string): Promise<void> {
    const parkingDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(parkingDoc);
  }
}
