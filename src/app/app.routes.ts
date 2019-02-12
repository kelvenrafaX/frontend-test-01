import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home/1', pathMatch: 'full' },
  { path: 'home/:id', component: HomeComponent }
];
