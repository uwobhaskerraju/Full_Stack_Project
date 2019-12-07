import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit, AfterViewInit {
  orgSongs: object;
  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {


    // call get all songs API
    this._http.getAllsongs()
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          this.orgSongs = data["result"];
        }
        else {
          //toast
        }
      });
  }

  showDetails(value) {
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
    console.log(navigationExtras)

    this.router.navigate(['song', songID], { relativeTo: this.route, state: navigationExtras })
  }

  ngAfterViewInit() {
    M.AutoInit();
    M.updateTextFields();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }
}
