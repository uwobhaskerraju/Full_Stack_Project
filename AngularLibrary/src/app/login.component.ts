import { Component, OnInit } from '@angular/core';

import { HttpService } from '../app/http.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularLibrary';

  constructor(private _http: HttpService) { }
  ngOnInit() { }

  ValidateLogin(loginForm: NgForm) {

    this._http.ValidateLogin(loginForm.value)
      .subscribe(data => {
        console.log(data)
      });

  }
}
