import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

declare var M: any

@Component({
  selector: 'app-viewplaylists',
  templateUrl: './viewplaylists.component.html',
  styleUrls: ['./viewplaylists.component.css']
})
export class ViewplaylistsAdminComponent implements OnInit {
  public imagepath: String
  allPlaylists: any
  allSongs: any

  constructor(private _http: HttpService) {

  }

  ngOnInit() {
    this.imagepath = environment.imagePath;

    //fetch all songs for displaying into playlist
    // get all songs 
    this._http.getAllSongs().subscribe(data => {
      if (data["statusCode"] = 200) {
        this.allSongs = data["result"]
        // console.log(data["result"])
      }
      else {
        //unable to fetch songs
        M.toast({ html: 'Unable to fetch songs. Try Later!', classes: 'rounded' })
      }
    });
    //fetch all playlists from API
    this._http.getAllPlaylists()
      .subscribe(data => {
        try {
          if (data["statusCode"] == 200) {
            let songIds = null
            songIds = this.getSongDetails(data["result"], this.allSongs);
            this.allPlaylists = songIds;
            // this.allPlaylists = data["result"]
            // console.log("admin view playlist")
            // console.log(this.allPlaylists)
          }
          else {
            M.toast({ html: 'Unable to fetch playlists. Try Later!', classes: 'rounded' })
          }
        } catch (error) {
          M.toast({ html: 'Unable to fetch playlists. Try Later!', classes: 'rounded' })
        }


      });


  }

  delPlaylist(value: any) {
    //1 - delete 2- edit
    switch (Number(value.srcElement.id.split('_')[1])) {
      case 1:
        let playlistID = value.srcElement.id.split('_')[0]
        this._http.delPlaylist(playlistID)
          .subscribe(data => {
            if (data["statusCode"] == 200) {
              // toast a message
              M.toast({ html: 'Playlist deleted', classes: 'rounded' })
              document.getElementById(playlistID + "_card").style.display = 'none'
            }
            else {
              // toast fail message
              M.toast({ html: 'Unable to delete playlist.', classes: 'rounded' })
            }
          });
        break;
      case 2:
        document.getElementById(value.srcElement.id.split('_')[0] + "_edit").style.display = 'block'
        break;
    }

  }

  saveDetails(title, desc, playlistID) {
    this._http.editPlaylistAdmin(playlistID, title, desc).subscribe(d => {
      if (d["statusCode"] == 200) {
        M.toast({ html: 'Playlist updated.', classes: 'rounded' })
        document.getElementById(playlistID + "_edit").style.display = 'none'
        this.ngOnInit();
      }
      else{
        M.toast({ html: 'Playlist updated failed.', classes: 'rounded' })
      }
    })
  }


  delSongPlaylist(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    let playListID = value.srcElement.id.split('_')[1]

    this._http.removeSongPlaylist(songID, playListID).
      subscribe(data => {
        if (data["statusCode"] == 200) {
          // toast a message`
          M.toast({ html: 'song deleted from playlist.', classes: 'rounded' })
          document.getElementById(songID + "_" + playListID + "_li").classList.add("scale-out")
          document.getElementById(songID + "_" + playListID + "_li").style.display = 'none'
        }
        else {
          // toast fail message
          M.toast({ html: 'unable to delete. try again!', classes: 'rounded' })
        }
      });
  }
  hidePlaylist(value: any) {
    console.log(value.srcElement.checked)
    console.log(value.srcElement.id)

    this._http.hidePlaylist(value.srcElement.id, value.srcElement.checked).subscribe(d => {
      if (d["statusCode"] == 200) {
        M.toast({ html: 'Playlist hidden.', classes: 'rounded' })
      }
      else {
        M.toast({ html: 'Unable to hide playlist. Try Later!', classes: 'rounded' })
      }
    })
  }

  getSongDetails(songIds: any, allSongs: any) {
    // we are iterating through the playlist array to get each songID,
    //later we are using main allSongs to get details from it and add into playlist  
    songIds.forEach(function (value, index) {
      //  console.log(value)
      // console.log("inside song details")
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
}
