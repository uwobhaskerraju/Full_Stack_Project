import { Component, OnInit } from '@angular/core';
declare var M: any;

import { HttpService } from '../http.service'
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ValidationServiceService } from '../validations/validation-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  temp:boolean
 
  constructor(private _http: HttpService, private router: Router, private _valService: ValidationServiceService) { }
  imagePath: String
  ngOnInit() {
    this.imagePath = environment.imagePath
    M.AutoInit();
    M.updateTextFields();
    var textNeedCount = document.querySelectorAll('input');
    M.CharacterCounter.init(textNeedCount);
  }

  ValidateLogin(email: String, pass: String) {
    var errMsg = '';
    if (this._valService.validateEmail(email)) {
      errMsg = errMsg.concat('email is not in proper format')
    }
   
    if (!Boolean(errMsg)) {
     
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
            M.toast({ html: 'Invalid Username/password', classes: 'rounded' })
            document.getElementById('signinPass').classList.add("invalid")
            document.getElementById('signinEmail').classList.add("invalid")

            //clear the form
          }

        });
    }
    else {
      M.toast({ html: 'Something went wrong. Try Again!', classes: 'rounded' })
      document.getElementById('signinPass').classList.add("invalid")
      document.getElementById('signinEmail').classList.add("invalid")
    }

  }

  registerUser(name, pass, email) {
    let errMsg = ''

    errMsg = errMsg.concat(this._valService.validateEmail(email))
    errMsg = errMsg.concat(this._valService.validatePassword(pass))
    errMsg = errMsg.concat(this._valService.validateUserName(name))
    // console.log(name)
    // console.log(pass)
    // console.log(name)
    if (!Boolean(errMsg)) {
      this._http.registerUser(name, pass, email)
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
    else {
      M.toast({ html: 'Something went wrong. Try Again!', classes: 'rounded' })

    }

  }
}
