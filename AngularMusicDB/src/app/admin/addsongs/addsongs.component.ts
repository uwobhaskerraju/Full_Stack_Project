import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-addsongs',
  templateUrl: './addsongs.component.html',
  styleUrls: ['./addsongs.component.css']
})
export class AddsongsComponent implements OnInit {

  public song: any = {};
  constructor(private _http: HttpService) { }

  ngOnInit() {
    //this.song=localStorage.getItem('id')
  }

  addSong() {
    console.log(this.song)
    // this._http.addSong(this.song).subscribe(data => {
    //   if (data["statusCode"] == 200) {
    //     console.log("song added")
    //   }
    //   else {
    //     console.log("song added failed")
    //   }
    // });
  }

}
