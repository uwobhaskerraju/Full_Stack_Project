import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { HttpService } from '../http.service';
declare var M: any;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})


export class VerifyComponent implements OnInit {

  email: String;
  name: String;
  state:Object;


  constructor(private _http: HttpService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
     {
      email: string,
      id: string,
      name: string,
      type:string,
      emailverified:string
    };
    // check for NULL and redirect to login page
    this.email = state.email;
    this.name = state.name;
    this.state=state;
  }

  ngOnInit() {
  
  }

  verifyAndRedirect() {
    console.log(this.state["id"])
    this._http.verifyAndRedirect(this.state["id"])
      .subscribe(data => {
        console.log(data)
        if (data["statusCode"]==200) {
          const navigationExtras: NavigationExtras = {
            state: {
              email: this.state["email"],
              id: this.state["id"],
              name: this.state["name"],
              type:this.state["type"],
              emailverified:this.state["emailverified"]
            }
            // state: {
            //   email: "saibhaskerraju@outlook.com",
            //   id: "12",
            //   name: "Sai Bhasker Raju",
            //   emailverified:"false",
            //   type:"user"
            // }
          };
          // route based on user type
          if(this.state["type"] =="admin"){
            this.router.navigate(['/admin'],navigationExtras)
          }
          if(this.state["type"] =="user"){
            this.router.navigate(['/dashboard'],navigationExtras)
          }
        }
        else {  
          // redirect to login page with sign up tab activated
          this.router.navigate(['/'])
          //toast message
          M.toast({ html: 'Something went wrong. Try Again!', classes: 'rounded' })
        }
      });
  }

}
