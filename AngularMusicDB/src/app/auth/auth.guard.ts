import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  state:Object;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
    {
      email: string,
      id: string,
      name: string,
      type:string,
      emailverified:string
    };
    this.state=state;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('ACCESS_TOKEN') != null) {
      // console.log("in auth guard")
     
      // console.log("state")
      // console.log(state)
      // if (state == null) {
      //   console.log("inside state null")
      //   this.router.navigate(['/'])
      //   return false;
      // }
      // console.log("after state")
      // //check whether email verified or not
      // if (!state["emailverified"]) {
      //   this.router.navigate(['/verify'])
      //   return false;
      // }

      // // check user type
      // if (localStorage.getItem('userRole').toLowerCase()) {
      //   switch (localStorage.getItem('userRole').toLowerCase()) {
      //     case "admin":
      //       this.router.navigate(['/admin']);
      //       break;
      //     case "user":
      //       this.router.navigate(['/dashboard']);
      //       break;
      //     default:
      //       this.router.navigate(['/']);
      //       break;
      //   }
      // }
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false;
    }
  }

}
