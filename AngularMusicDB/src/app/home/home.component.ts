import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orgSongs:Object;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    
    this._http.getTopTenSongs()
    .subscribe(data=>{
      console.log(data)
      this.orgSongs=data;
    });
  }

}
