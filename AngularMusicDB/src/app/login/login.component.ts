import { Component, OnInit, AfterViewChecked } from '@angular/core';
declare var M: any;

import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service'
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  ngAfterViewChecked(): void {
    var textNeedCount = document.querySelectorAll('input');
    M.CharacterCounter.init(textNeedCount);
  }

  constructor(private _http: HttpService, private router: Router) { }
  imagePath: String
  ngOnInit() {
    this.imagePath = environment.imagePath
    M.AutoInit();
    M.updateTextFields();
    var textNeedCount = document.querySelectorAll('input');
    M.CharacterCounter.init(textNeedCount);
  }

  ValidateLogin(email: String, pass: String) {
    this._http.ValidateLogin(email, pass)
      .subscribe(data => {
        console.log(data)
        if (data["statusCode"] == 200) {
          const navigationExtras: NavigationExtras = {
            state: {
              email: data["result"]["email"],
              id: data["result"]["id"],
              name: data["result"]["name"],
              active: data["result"]["emailverified"],
              type: data["result"]["userType"]
            }
          };
          //console.log(navigationExtras)
          localStorage.setItem("ACCESS_TOKEN", data["WWW-Authenticate"]);
          if (!data["result"]["emailverified"]) {
            this.router.navigate(['/verify'], navigationExtras)
          }
          else {
            // route based on user type
            if (data["result"]["userType"] == "admin") {
              this.router.navigate(['/admin'], navigationExtras)
            }
            if (data["result"]["userType"] == "user") {
              this.router.navigate(['/dashboard'], navigationExtras)
            }

          }
        }
        else {
          // throw a toast
          M.toast({ html: 'Something went wrong. Try Again!', classes: 'rounded' })
          //clear the form
        }

      });
  }

  registerUser(name,pass,email) {

    this._http.registerUser(name,pass,email)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          const navigationExtras: NavigationExtras = {
            state: {
              email: data["result"]["email"],
              id: data["result"]["id"],
              name: data["result"]["name"],
              emailverified: data["result"]["emailverified"],
              type: data["result"]["userType"]
            }
          };
          localStorage.setItem("ACCESS_TOKEN", data["WWW-Authenticate"]);
          localStorage.setItem("userRole", data["result"]["userType"]);

          if (!data["result"]["emailverified"]) {
            this.router.navigate(['/verify'], navigationExtras)
          }
          if (data["result"]["emailverified"]) {
            this.router.navigate(['/dashboard'], navigationExtras)
          }
        }
        else {
          // throw a toast
          M.toast({ html: 'Something went wrong. Try Again!', classes: 'rounded' })
          //clear the form
          this.ngOnInit();
        }
      });

  }
}
