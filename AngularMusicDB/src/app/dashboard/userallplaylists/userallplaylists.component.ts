import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
declare var M: any

@Component({
  selector: 'app-userallplaylists',
  templateUrl: './userallplaylists.component.html',
  styleUrls: ['./userallplaylists.component.css']
})
export class UserallplaylistsComponent implements OnInit {
  allPlaylists: any
  allSongs: any
  constructor(private _http: HttpService) { }

  ngOnInit() {
    //fetch all songs for displaying into playlist
    // get all songs 
    this._http.getAllsongs().subscribe(data => {
      if (data["statusCode"] = 200) {
        this.allSongs = data["result"]
        //console.log(data["result"])
      }
      else {
        //unable to fetch songs
        M.toast({ html: 'Unable to fetch songs. Try Later!', classes: 'rounded' })
      }
    });
    //get all playlist in DB which are not hidden
    this._http.getAllUserPlaylists()
      .subscribe(data => {
        try {
          if (data["statusCode"] == 200) {
            // console.log("first playlist")
            // console.log(data["result"])
            let songIds = null
            songIds = this.getSongDetails(data["result"], this.allSongs);
            this.allPlaylists = songIds;
            //this.allPlaylists = data["result"]
            //console.log(this.allPlaylists)
          }
          else {
            M.toast({ html: 'Unable to fetch playlists. Try Later!', classes: 'rounded' })
          }
        } catch (error) {
          M.toast({ html: 'Unable to fetch playlists. Try Later!', classes: 'rounded' })
        }
      });
  }

  getSongDetails(songIds: any, allSongs: any) {
    // we are iterating through the playlist array to get each songID,
    //later we are using main allSongs to get details from it and add into playlist  
    songIds.forEach(function (value, index) {
      console.log(value)
      console.log("inside song details")
      value["songID"].forEach(function (value1, index1) {
        if (allSongs.find(x => x["_id"] == value1.toLowerCase())) {
          value["songID"][index1] = value["songID"][index1]
            + "()" + allSongs.find(x => x["_id"] == value1.toLowerCase())["name"]
            + "()" + allSongs.find(x => x["_id"] == value1.toLowerCase())["album"]
            + "()" + allSongs.find(x => x["_id"] == value1.toLowerCase())["picture"]

        }
      })

    });
    return songIds;
  }

}
