import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'parking-list',
    loadComponent: () => import('./driver/parking-list/parking-list.page').then( m => m.ParkingListPage)
  },
  {
    path: 'parking-details',
    loadComponent: () => import('./driver/parking-details/parking-details.page').then( m => m.ParkingDetailsPage)
  },
  {
    path: 'my-reservations',
    loadComponent: () => import('./driver/my-reservations/my-reservations.page').then( m => m.MyReservationsPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./manager/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'manage-parking',
    loadComponent: () => import('./manager/manage-parking/manage-parking.page').then(m => m.ManageParkingPage)
  },
  {
    path: 'manage-spots',
    loadComponent: () => import('./manager/manage-spots/manage-spots.page').then(m => m.ManageSpotsPage)
  }

];
