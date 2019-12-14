import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

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
  imagePath: String;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
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
    this.imagePath = environment.imagePath;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  generateRandNum() {
    return Math.floor(Math.random() * environment.iconsLen) + 1;
  }
  naviagte(index: any) {
    console.log(index)
    switch (index) {
      case 1:
        this.router.navigate(['/'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['add'], { relativeTo: this.route });
        break;
      case 3:
        this.router.navigate(['playlist'], { relativeTo: this.route });
        break;
      case 4:
        this.router.navigate(['view'], { relativeTo: this.route });
        break;
    }
  }
}
