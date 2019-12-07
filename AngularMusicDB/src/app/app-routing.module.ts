import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { HomesongdetailsComponent } from './home/homesongdetails/homesongdetails.component';
import {HomesongsComponent} from './home/homesongs/homesongs.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: HomesongsComponent },
      { path: 'home/:id', component: HomesongdetailsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
