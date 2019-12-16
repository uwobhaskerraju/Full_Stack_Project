import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  dState: Object;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
      {
        email: string,
        id: string,
        name: string,
        type: string,
        emailverified: string
      };
    this.dState = state;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('ACCESS_TOKEN') != null) {

      if (this.dState == null) {
        console.log("inside null")
        this.router.navigate(['/'])
        return false;
      }
      // get decoded data from token
      // verify whether email is verified or not
      //also check role
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false;
    }
  }

}
