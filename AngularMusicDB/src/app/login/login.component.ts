import { Component, OnInit } from '@angular/core';
declare var M: any;

import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service'
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _http: HttpService, private router: Router) { }

  ngOnInit() {
    const elem = document.querySelector('.tabs');
    const options = {};
    M.Tabs.init(elem, options);
  }

  ValidateLogin(email: String, pass: String) {
    this._http.ValidateLogin(email, pass)
      .subscribe(data => {
        console.log(data)
        if (data["statusCode"] == 200) {
          const navigationExtras: NavigationExtras = {
            // state: {
            //   email: data["email"],
            //   id: data["id"],
            //   name: data["name"]
            // }
            state: {
              email: "saibhaskerraju@outlook.com",
              id: "12",
              name: "Sai Bhasker Raju",
              active:"false",
              type:"user"
            }
          };
          localStorage.setItem("ACCESS_TOKEN", data["WWW-Authenticate"]);
          if(!data["active"]){
            this.router.navigate(['/verify'],navigationExtras)
          }
          else{
            // route based on user type
            if(data["userType"] =="admin"){
              this.router.navigate(['/admin'],navigationExtras)
            }
            if(data["userType"] =="user"){
              this.router.navigate(['/dashboard'],navigationExtras)
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

  registerUser(regForm: NgForm) {
   
    this._http.registerUser(regForm.value)
      .subscribe(data => {
        console.log(data)
        data["statusCode"]=200;
        if (data["statusCode"] == 200) {
          const navigationExtras: NavigationExtras = {
            // state: {
            //   email: data["email"],
            //   id: data["id"],
            //   name: data["name"]
            // }
            state: {
              email: "saibhaskerraju@outlook.com",
              id: "12",
              name: "Sai Bhasker Raju",
              active:"false",
              type:"user"
            }
          };
          localStorage.setItem("ACCESS_TOKEN", data["WWW-Authenticate"]);
          if(!data["active"]){
            this.router.navigate(['/verify'],navigationExtras)
          }
          else{
            this.router.navigate(['/dashboard'],navigationExtras)
          }
       }
        else {
          // throw a toast
          M.toast({ html: 'Something went wrong. Try Again!', classes: 'rounded' })
          //clear the form
        }
      });

  }
}
