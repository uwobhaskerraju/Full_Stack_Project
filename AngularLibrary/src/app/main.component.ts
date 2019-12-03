import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AppComponent implements OnInit {
  title = 'Music Library';

  songs:Object;
  disSongsObj:Object;

  constructor(private _http: HttpService) { }
  ngOnInit() { 
    // get all ten songs
    this._http.getTopSongs()
    .subscribe(data=>{
      this.songs=data;
      this.disSongsObj=this.songs;
      console.log(data)
    });
  }

  ValidateLogin(loginForm: NgForm) {

    this._http.ValidateLogin(loginForm.value)
      .subscribe(data => {
        console.log(data)
      });

  }
}
