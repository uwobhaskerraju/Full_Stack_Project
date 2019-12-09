import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.component.html',
  styleUrls: ['./createplaylist.component.css']
})
export class CreateplaylistComponent implements OnInit {
  public playlist: any = {};
  constructor(private _http: HttpService) {
    this.playlist.id = localStorage.getItem('id')
    this.playlist.name = localStorage.getItem('name')
    this.playlist.email = localStorage.getItem('email')
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.playlist = null
    // this.routeSub.unsubscribe();
  }

  addPlayListUser() {
    this._http.addPlayListUser(this.playlist).subscribe(
      data => {
        if (data["statusCode"] == 200) {
          // playlist created
        }
        else {
          // toast
        }
      }
    );
  }
}
