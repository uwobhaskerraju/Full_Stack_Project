import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
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
