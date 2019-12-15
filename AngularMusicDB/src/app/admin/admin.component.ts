import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment.prod'
import { ValidationServiceService } from '../validations/validation-service.service';

declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allPlaylists: Object
  state: Object
  public song: any = {};
  public playlist: any = {};
  imagePath: String;

  constructor(private _http: HttpService, private router: Router,
     private route: ActivatedRoute,private _validate:ValidationServiceService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
      {
        email: string,
        id: string,
        name: string,
        type: string,
        emailverified: string
      };
    this.state = state;
    this._validate.loggedInUser["id"]=this.state["id"]
    this._validate.loggedInUser["name"]=this.state["name"]
    this._validate.loggedInUser["email"]=this.state["email"]
  }


  ngOnInit() {
    this.imagePath = environment.imagePath;
    
  }
  
  getSongDetails(songIds: any, allSongs: any) {
    // we are iterating through the playlist array to get each songID,
    //later we are using main allSongs to get details from it and add into playlist  
    songIds.forEach(function (value, index) {

      value["songID"].forEach(function (value1, index1) {
        if (allSongs.find(x => x["_id"] == value1.toLowerCase())) {
          value["songID"][index1] = value["songID"][index1]
            + "()" + allSongs.find(x => x["_id"] == value1.toLowerCase())["Name"]
            + "()" + allSongs.find(x => x["_id"] == value1.toLowerCase())["Album"]
            + "()" + allSongs.find(x => x["_id"] == value1.toLowerCase())["Picture"]

        }
      })

    });

    return songIds;
  }
  addSong() {
    this._http.addSong(this.song).subscribe(
      data => {

        if (data["statusCode"] == 200) {
          // toast saying added
          //clear the form

        }
        else {
          //unable to insert
          //toast saying something went wrong

        }
      }
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  delSongPlaylist(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    let playListID = value.srcElement.id.split('_')[1]
    this._http.removeSongPlaylist(songID, playListID).
      subscribe(data => {
        if (data["statusCode"] == 200) {
          // toast a message
          console.log("true")
        }
        else {
          // toast fail message
          console.log("false")
        }
      });
  }

  delPlaylist(value: any) {
    let playlistID = value.srcElement.id
    this._http.delPlaylist(playlistID)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          // toast a message
          console.log("true")
        }
        else {
          // toast fail message
          console.log("false")
        }
      });
  }

  naviagte(index: any) {
    console.log(index)
    switch (index) {
      case 1:
        this.router.navigate(['admin/']);
        break;
      case 2:
        this.router.navigate(['song'], { relativeTo: this.route });
        break;
      case 3:
        this.router.navigate(['song/add'], { relativeTo: this.route });
        break;
      case 4:
        this.router.navigate(['playlist/view'], { relativeTo: this.route });
        break;
      case 5:
          const navigationExtras: NavigationExtras = {
            state: {
              id: this.state["id"]
            }
          };
        this.router.navigate(['playlist/create'], { relativeTo: this.route,state:navigationExtras });
        break;
    }
  }
}
