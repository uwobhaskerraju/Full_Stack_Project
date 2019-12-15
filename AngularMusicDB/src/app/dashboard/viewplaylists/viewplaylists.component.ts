import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment.prod';
import { ValidationServiceService } from 'src/app/validations/validation-service.service';

declare var M: any;

@Component({
  selector: 'app-viewplaylists',
  templateUrl: './viewplaylists.component.html',
  styleUrls: ['./viewplaylists.component.css']
})
export class ViewplaylistsComponent implements OnInit {

  public imagepath: String
  allPlaylists: any
  allSongs: any
  userID: any
  constructor(private _http: HttpService, private _validate: ValidationServiceService) {
    this.imagepath = environment.imagePath;
    this.userID = this._validate.loggedInUser["id"]
  }

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
        M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
      }
    });
    //get all playlists of this user
    this._http.getUserPlaylists(this.userID)
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
            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
          }
        } catch (error) {
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      });

  }

  getSongDetails(songIds: any, allSongs: any) {
    // we are iterating through the playlist array to get each songID,
    //later we are using main allSongs to get details from it and add into playlist  
    songIds.forEach(function (value, index) {
      //console.log(value)
      // console.log("inside song details")
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

  hidePlaylist(value: any) {
    //console.log(value.srcElement.checked)
    //console.log(value.srcElement.id)

    this._http.hideUserPlaylist(value.srcElement.id, value.srcElement.checked, this.userID).subscribe(d => {
      console.log(d)
      if (d["statusCode"] == 200) {
        M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
        this.ngOnInit()
      }
      else {
        M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
      }
    })
  }

  delSongPlaylist(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    let playListID = value.srcElement.id.split('_')[1]

    this._http.removeSongUserPlaylist(songID, playListID, this.userID).
      subscribe(data => {
        if (data["statusCode"] == 200) {
          // toast a message`
          M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
          this.ngOnInit()
        }
        else {
          // toast fail message
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
          this.ngOnInit()
        }
      });
  }

  delPlaylist(value: any) {
    //let playlistID=value.srcElement.id.split('_')[0]
    document.getElementById(value.srcElement.id.split('_')[0] + "_edit").style.display = 'block'

  }

  saveDetails(title, desc, playlistID) {
    let errMsg = ''
    //validate title and descr
    errMsg = errMsg.concat(this._validate.validateDesc(desc))
    errMsg = errMsg.concat(this._validate.validateTitle(title))
    if (!Boolean(errMsg)) {
      this._http.editPlaylistUser(playlistID, title, desc, this.userID).subscribe(d => {
        if (d["statusCode"] == 200) {
          M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
          document.getElementById(playlistID + "_edit").style.display = 'none'
          this.ngOnInit();
        }
        else {
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      })
    }
    else {
      this._validate.generateToast(errMsg);
    }

  }
}
