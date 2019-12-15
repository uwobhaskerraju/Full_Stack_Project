import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { VerifyComponent } from './verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomesongdetailsComponent } from './home/homesongdetails/homesongdetails.component';
import { HomesongsComponent } from './home/homesongs/homesongs.component';
import { DashboardhomeComponent } from './dashboard/dashboardhome/dashboardhome.component';
import { DsongdetailsComponent } from './dashboard/dsongdetails/dsongdetails.component';
import { AddsongComponent } from './dashboard/addsong/addsong.component';
import { CreateplaylistComponent } from './dashboard/createplaylist/createplaylist.component';
import { ViewplaylistsComponent } from './dashboard/viewplaylists/viewplaylists.component';
import { ViewusersComponent } from './admin/viewusers/viewusers.component';
import { ViewsongsComponent } from './admin/viewsongs/viewsongs.component';
import { ViewsongdetailsComponent } from './admin/viewsongdetails/viewsongdetails.component';
import { EditsongdetailsComponent } from './admin/editsongdetails/editsongdetails.component';
import { AddsongsComponent } from './admin/addsongs/addsongs.component';
import { ViewplaylistsAdminComponent } from './admin/viewplaylists/viewplaylists.component'
import {CreateplaylistAdminComponent} from './admin/createplaylist/createplaylist.component';
import { AddSongPlaylistComponent } from './admin/add-song-playlist/add-song-playlist.component';
import { AddsongplayuserComponent } from './dashboard/addsongplayuser/addsongplayuser.component';
import { UserallplaylistsComponent } from './dashboard/userallplaylists/userallplaylists.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VerifyComponent,
    DashboardComponent,
    AdminComponent,
    HomesongdetailsComponent,
    HomesongsComponent,
    DashboardhomeComponent,
    DsongdetailsComponent,
    AddsongComponent,
    CreateplaylistComponent,
    ViewplaylistsComponent,
    ViewusersComponent,
    ViewsongsComponent,
    ViewsongdetailsComponent,
    EditsongdetailsComponent,
    AddsongsComponent,
    ViewplaylistsAdminComponent,
    CreateplaylistAdminComponent,
    AddSongPlaylistComponent,
    AddsongplayuserComponent,
    UserallplaylistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
// ,
//   {
//     provide:HTTP_INTERCEPTORS,
//     useClass:AuthInterceptor,
//     multi:true
//   }