import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { HomesongdetailsComponent } from './home/homesongdetails/homesongdetails.component';
import { HomesongsComponent } from './home/homesongs/homesongs.component';
import { DashboardhomeComponent } from './dashboard/dashboardhome/dashboardhome.component';
import { DsongdetailsComponent } from './dashboard/dsongdetails/dsongdetails.component'
import { AddsongComponent } from './dashboard/addsong/addsong.component'
import { CreateplaylistComponent } from './dashboard/createplaylist/createplaylist.component'
import { ViewplaylistsComponent } from './dashboard/viewplaylists/viewplaylists.component'
import { ViewusersComponent } from './admin/viewusers/viewusers.component'
import { ViewsongsComponent } from './admin/viewsongs/viewsongs.component'
import { ViewsongdetailsComponent } from './admin/viewsongdetails/viewsongdetails.component'
import { EditsongdetailsComponent } from './admin/editsongdetails/editsongdetails.component'
import { AddsongsComponent } from './admin/addsongs/addsongs.component'


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: HomesongsComponent },
      { path: 'home/:id', component: HomesongdetailsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: DashboardhomeComponent },
      { path: 'song/:id', component: DsongdetailsComponent },
      { path: 'add', component: AddsongComponent },
      { path: 'playlist', component: CreateplaylistComponent },
      { path: 'view', component: ViewplaylistsComponent }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', component: ViewusersComponent },
      { path: 'song', component: ViewsongsComponent },
      { path: 'song/view/:id', component: ViewsongdetailsComponent },
      { path: 'song/edit/:id', component: EditsongdetailsComponent },
      { path: 'song/add', component: AddsongsComponent }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
