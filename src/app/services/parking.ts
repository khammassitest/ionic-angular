import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(private firestore: Firestore) {}

  getParkings(): Observable<any[]> {
    const parkingCollection = collection(this.firestore, 'parkings');
    return collectionData(parkingCollection, { idField: 'id' });
  }

  getParkingById(id: string): Observable<any> {
    const parkingDoc = doc(this.firestore, `parkings/${id}`);
    return docData(parkingDoc, { idField: 'id' });
  }
}