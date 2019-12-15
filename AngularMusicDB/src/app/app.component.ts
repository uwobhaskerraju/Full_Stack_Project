import { Component, OnInit } from '@angular/core';
declare var M: any;
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
  title = 'AngularMusicDB';

  ngOnInit(){
    M.AutoInit();
    //localStorage.setItem('userRole','guest');
  }
}
