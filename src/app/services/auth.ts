import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string, role: string, name: string, phone: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'users', uid), {
        uid,
        email,
        role,
        name,
        phone,
        createdAt: new Date()
      });

      console.log('User registered in Firebase:', email);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const userDoc = await getDoc(doc(this.firestore, 'users', userCredential.user.uid));
      return userDoc.data();
    } catch (error) {
      throw error;
    }
  }

  logout() {
    return signOut(this.auth);
  }
  getAuthState(): Observable<any> {
    return authState(this.auth);
  }
}
