export interface Reservation {
  id: string;
  userId: string;
  parkingId: string;
  spotNumber: number;
  status: 'CONFIRMED' | 'CANCELLED';
  date: string; 
}
