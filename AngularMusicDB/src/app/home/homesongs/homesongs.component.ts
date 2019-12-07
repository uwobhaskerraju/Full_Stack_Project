import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-homesongs',
  templateUrl: './homesongs.component.html',
  styleUrls: ['./homesongs.component.css']
})
export class HomesongsComponent implements OnInit {
  orgSongs:Object;
  constructor(private _http: HttpService, private router: Router) { }

  ngOnInit() {
    this._http.getTopTenSongs()
      .subscribe(data => {
        //console.log(data)
        this.orgSongs = data;
      });
  }

  showDetails(value:any){
    let songID = value.srcElement.id.split('_')[0]
    //console.log(songID)

    const navigationExtras: NavigationExtras = {
      state: {
        allSongs: this.orgSongs
      }
    };

    this.router.navigate(['/home',songID],navigationExtras);

  }

  

}
