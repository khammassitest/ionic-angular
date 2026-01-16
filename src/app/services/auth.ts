import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(email: string, password: string, role: string) {
    localStorage.setItem('user', JSON.stringify({ email, role }));
    console.log('User registered:', email, role);
  }
  currentUser: User | null = null;


  users: User[] = [
    { uid: '1', email: 'driver@test.com', password: '123', role: 'DRIVER' },
    { uid: '2', email: 'manager@test.com', password: '123', role: 'MANAGER' }
  ];

  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getRole(): 'DRIVER' | 'MANAGER' | null {
    return this.currentUser?.role || null;
  }
}
