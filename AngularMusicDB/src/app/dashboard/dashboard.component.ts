import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  state:Object;
  name:String

  constructor(private _http: HttpService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state;
  }

  ngOnInit() {
    this.name=this.state["name"]
  }

}
