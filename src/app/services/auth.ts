import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  constructor() {}

  async login(email: string, password: string) {
    return runInInjectionContext(this.injector, async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        const userDoc = await getDoc(doc(this.firestore, `users/${userCredential.user.uid}`));
        return userDoc.exists() ? userDoc.data() : null;
      } catch (error) {
        console.error('Login Error:', error);
        throw error;
      }
    });
  }

  async register(email: string, password: string, role: string, name: string, phone: string) {
    return runInInjectionContext(this.injector, async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(this.firestore, `users/${uid}`), {
          uid,
          email,
          role,
          name,
          phone,
          password,
          createdAt: new Date()
        });

        return userCredential.user;
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Cet email est pré-enregistré, essayez de vous connecter');
        } else {
          console.error('Registration Error:', error);
        }
        throw error;
      }
    });
  }

  logout() {
    return signOut(this.auth);
  }
}