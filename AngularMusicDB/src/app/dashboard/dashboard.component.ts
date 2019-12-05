import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit  {
  ngAfterViewInit(): void {
    setTimeout( function() {
      var elem = document.querySelector('.sidenav');
      var instance = M.Sidenav.init(elem);
    }, 0)
  }

  state:Object;
  name:String

  constructor(private _http: HttpService, private router: Router) { 
  
  }

  ngOnInit() {
    // const navigation = this.router.getCurrentNavigation();
    // this.state = navigation.extras.state;
    // this.name=this.state["name"]
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
