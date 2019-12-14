import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

declare var M: any
@Component({
  selector: 'app-add-song-playlist',
  templateUrl: './add-song-playlist.component.html',
  styleUrls: ['./add-song-playlist.component.css']
})
export class AddSongPlaylistComponent implements OnInit {
  songID: String
  routeSub: any;
  imagePath: String
  allPlaylists: any
  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    this.imagePath = environment.imagePath
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.songID = params['id']
    });


    //get all playlists
    this._http.getAllPlaylists()
      .subscribe(data => {
        try {
          if (data["statusCode"] == 200) {

            this.allPlaylists = data["result"]
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

  addSongPlaylistAdmin(value: any) {
    var playlistID = value.srcElement.id
    // console.log(playlistID)
    this._http.addSongPlaylistAdmin(this.songID, playlistID)
      .subscribe(d => {
        console.log(d)
        if (d["statusCode"] == 200) {
          M.toast({ html: 'Song added to playlist', classes: 'rounded' })
          this.router.navigate(['admin'])
        }
        else {
          M.toast({ html: 'something went wrong. Try Later!', classes: 'rounded' })
        }
      });
  }

}
