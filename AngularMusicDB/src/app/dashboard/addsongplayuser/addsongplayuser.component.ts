import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment.prod';
import { ValidationServiceService } from 'src/app/validations/validation-service.service';
declare var M: any

@Component({
  selector: 'app-addsongplayuser',
  templateUrl: './addsongplayuser.component.html',
  styleUrls: ['./addsongplayuser.component.css']
})
export class AddsongplayuserComponent implements OnInit {
  allPlaylists: any
  userID: any
  songID: any
  private routeSub: Subscription;
  imagePath: any

  constructor(private _http: HttpService, private router: Router,
    private route: ActivatedRoute, private _validate: ValidationServiceService) {
    this.userID = this._validate.loggedInUser["id"]
    this.imagePath = environment.imagePath
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.songID = params['id']
    });
    //get all playlists of this user
    this._http.getUserPlaylists(this.userID)
      .subscribe(data => {
        try {
          if (data["statusCode"] == 200) {

            this.allPlaylists = data["result"]

          }
          else {
            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
          }
        } catch (error) {
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      });
  }
  ngOnDestroy() {
    this.allPlaylists = null
    this.userID = null
    this.songID = null
    this.routeSub.unsubscribe();
  }
  addSongPlaylist(value: any) {
    var playListID = value.srcElement.id
    this._http.addSongPlaylistUser(playListID, this.songID, this.userID)
      .subscribe(d => {
        if (d["statusCode"] == 200) {
          M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
          this.router.navigate(['/dashboard'])
        }
        else {
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      });
  }

}
