import { Routes } from '@angular/router';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: 'predictions', component: PredictionsComponent },
  { path: 'monitoring', component: MonitoringComponent } ,
  { path: 'welcome', component: WelcomePageComponent }  ,
  { path: '', redirectTo: '/welcome', pathMatch: 'full' } 
];