import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-homesongs',
  templateUrl: './homesongs.component.html',
  styleUrls: ['./homesongs.component.css']
})
export class HomesongsComponent implements OnInit {
  orgSongs: Object;
  constructor(private _http: HttpService, private router: Router) { }

  ngOnInit() {
    this._http.getTopTenSongs()
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          //console.log(data)
          this.orgSongs = data["result"];
        }
        else {
          //toast
        }

      });
  }

  showDetails(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    //console.log(songID)
    let songData;
    //console.log(this.orgSongs.length)
    for (var i = 0; i < 20; i++) {
      if (this.orgSongs[i]["_id"] == songID) {
        songData = this.orgSongs[i]
        break;
      }
    }
    // console.log(this.orgSongs)
    //console.log(songData)
    const navigationExtras: NavigationExtras = {
      state: {
        allSongs: songData
      }
    };

    this.router.navigate(['/home', songID], navigationExtras);

  }


  onSearchChange(value) {
    //console.log(value)
    if (value) {
      this._http.getSearchedSongs(value).subscribe(data => {
        if (data["statusCode"] == 200) {
          this.orgSongs = data["result"]
          console.log(this.orgSongs)
        }
      });
    }
    else {
      this.ngOnInit();
    }

  }
}
