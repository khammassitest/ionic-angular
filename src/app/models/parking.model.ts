export interface Parking {
  id?: string;
  nom: string;
  description: string;
  prix: number;
  places: number;
  codePostal: number;
  ville: string;
  dateOpen: string;
  dateClose: string;
  statut: string;
}