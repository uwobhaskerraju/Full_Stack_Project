import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editsongdetails',
  templateUrl: './editsongdetails.component.html',
  styleUrls: ['./editsongdetails.component.css']
})
export class EditsongdetailsComponent implements OnInit {
  songDetails = [];
  imagePath: String;
  songID: String
  routeSub: any;
  songReviews: Object

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state.state as
      {
        allSongs: Object
      };
    this.songDetails.push(state.allSongs)
    console.log("song details")
    console.log(this.songDetails)
  }

  deleteSong(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    this._http.adminDeleteSong(songID)
      .subscribe(d => {
        if (d["statusCode"] == 200) {
          // yes
        }
        else {
          //no
        }
      });
  }

  updateSong(value:any){
    let songID = value.srcElement.id.split('_')[0]
    console.log(this.songDetails)
    // this._http.adminUpdateSong(songID)
    //   .subscribe(d => {
    //     if (d["statusCode"] == 200) {
    //       // yes
    //     }
    //     else {
    //       //no
    //     }
    //   });
  }

  ngOnInit() {
    this.imagePath = environment.imagePath;
    this.routeSub = this.route.params.subscribe(params => {
      this.songID = params['id']
    });

    // send API to get review of this song
    this._http.getSongReviews(this.songID)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          this.songReviews = data["result"]
          //console.log(this.songReviews)
        }
        else {
          // toast saying false
        }
      });
  }

  generateRandNum() {
    return Math.floor(Math.random() * environment.iconsLen) + 1;
  }
  ngOnDestroy() {
    this.songDetails = null
    this.songReviews = null
    this.songID = null
    this.routeSub.unsubscribe();
  }
  goBack() {
    this.songDetails = null
    this.songReviews = null
    this.songID = null
    this.router.navigate(['/admin']);
  }
  deleteReview(id: any) {
    this._http.deleteReview(id)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          // toast saying yes
        }
        else {
          // toasy saying no
        }
      });
  }
}
