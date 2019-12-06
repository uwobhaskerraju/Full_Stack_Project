import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod'

declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allUsers: Object
  allSongs: Object
  allPlaylists: Object
  state: Object
  public song: any = {};
  public playlist: any = {};
  imagePath: String;

  constructor(private _http: HttpService, private router: Router) {
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


    // instances.updateData({
    //   "Apple": null,
    //   "Microsoft": null,
    //   "Google": 'https://placehold.it/250x250'
    // });
  }


  ngOnInit() {
    localStorage.setItem('ACCESS_TOKEN', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaWJoYXNrZXJyYWp1QG91dGxvb2suY29tIiwiaWQiOiI1ZGU0YjJlNzIyYzg0NjEyYjgwMTAxMGIiLCJuYW1lIjoic2FpIiwiZW1haWx2ZXJpZmllZCI6ZmFsc2UsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE1NzU1NjYwOTV9.xhTiB3fAb4aCyPrWqtUIw4eEz2BFLL_dL5MQBTVjYHk")
    this.imagePath = environment.imagePath;

    
    const elem = document.querySelector('.tabs');
    const options = {};
    M.Tabs.init(elem, options);

    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);
   
    
    // get all users API
    this._http.getallUsers().subscribe(data => {
      if (data["statusCode"] = 200) {

        this.allUsers = data["result"]
      }
      else {
        //unable to fetch users
      }

    });
    // get all songs 
    this._http.getAllSongs().subscribe(data => {
      if (data["statusCode"] = 200) {

       
        this.allSongs = data["result"]
      }
      else {
        //unable to fetch users
      }

    });
    //get song name and album

    //get all playlists
    this._http.getAllPlaylists()
      .subscribe(data => {
        if (data["statusCode"] = 200) {
          let songIds = null
          songIds = this.getSongDetails(data["result"], this.allSongs);

          this.allPlaylists = songIds;
          // console.log("all playlist")
          // console.log(this.allPlaylists)
        }
        else {
          //unable to fetch playlists
        }
      });
  }//end of ngInit()
  addPlaylist() {
    this._http.addPlaylist(this.playlist, this.state["id"])
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          // say good
          //clear the form
        }
        else {
          // throw a toast
        }
      });

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
}
