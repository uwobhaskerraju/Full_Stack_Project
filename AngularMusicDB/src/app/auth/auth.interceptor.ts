import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<HttpEvent<any>> {
        console.log("inside inter")
        if (!req.headers.has('No-Auth'))
            return next.handle(req.clone());

        // if (localStorage.getItem('ACCESS_TOKEN') != null) {
        //     const clonedreq = req.clone({
        //         headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('ACCESS_TOKEN'))
        //     });
        //     return next.handle(clonedreq)
           
        // }
        // else {
        //     this.router.navigateByUrl('/');
        // }
    }

}