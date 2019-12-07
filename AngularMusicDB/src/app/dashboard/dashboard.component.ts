import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // ngAfterViewInit(): void {
  //   // setTimeout(function () {
  //   //   var elem = document.querySelector('.sidenav');
  //   //   var instance = M.Sidenav.init(elem);
  //   // }, 0)
  // }

  state: Object; // this is for dashboard display purpose
  name: String

  constructor(private _http: HttpService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state;
    this.name = this.state["name"]
    //console.log("dashboard")
    // console.log(this.state)
    localStorage.setItem('id', this.state["id"])
    localStorage.setItem('name', this.state["name"])
    localStorage.setItem('email', this.state["email"])
    
  }

  ngOnInit() {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  naviagte(index: any) {
    switch (index) {
      case 1:
        this.router.navigate(['/dashboard']);
        break;
      case 2:
        this.router.navigate(['/dashboard']);
        break;

    }
  }
}
