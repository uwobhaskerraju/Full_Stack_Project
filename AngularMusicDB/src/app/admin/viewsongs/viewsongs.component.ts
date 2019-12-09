import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment.prod';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-viewsongs',
  templateUrl: './viewsongs.component.html',
  styleUrls: ['./viewsongs.component.css']
})
export class ViewsongsComponent implements OnInit {
  allSongs: Object
  imagePath: String
  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    this.imagePath = environment.imagePath;
  }

  ngOnInit() {

    // get all songs 
    this._http.getAllSongs().subscribe(data => {
      if (data["statusCode"] = 200) {
        this.allSongs = data["result"]
        console.log(data["result"])
      }
      else {
        //unable to fetch users
      }
    });
  }

  naviagte(value: any) {
    let songID = value.srcElement.id.split('_')[0]

    let songData;
    //console.log(this.orgSongs.length)
    for (var i = 0; i < 100; i++) {
      if (this.allSongs[i]["_id"] == songID) {
        songData = this.allSongs[i]
        break;
      }
    }

    const navigationExtras: NavigationExtras = {
      state: {
        allSongs: songData
      }
    };
    //console.log(navigationExtras)
    console.log(value.srcElement.id.split('_')[1])
    switch (Number(value.srcElement.id.split('_')[1])) {
      case 1:
        this.router.navigate(['edit', songID], { relativeTo: this.route, state: navigationExtras })
        break;
      case 2:
        this.router.navigate(['view',songID], {relativeTo: this.route,state: navigationExtras })
        break;
      default:
        console.log("default")
        break;

    }
  }

}
