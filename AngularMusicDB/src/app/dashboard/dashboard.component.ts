import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ValidationServiceService } from '../validations/validation-service.service';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  state: {}; // this is for dashboard display purpose
  name: String
  imagePath: String;

  constructor(private _http: HttpService,
    private router: Router, private route: ActivatedRoute,
    private _validate: ValidationServiceService) {
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state;
    this.name = this.state["name"]

    this._validate.loggedInUser["id"] = this.state["id"]
    this._validate.loggedInUser["name"] = this.state["name"]
    this._validate.loggedInUser["email"] = this.state["email"]
    // localStorage.setItem('id', this.state["id"])
    // localStorage.setItem('name', this.state["name"])
    // localStorage.setItem('email', this.state["email"])

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
        this.router.navigate(['/dashboard']);
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
      case 5:
        this.router.navigate(['playlist/all'], { relativeTo: this.route });
        break;
    }
  }
}
