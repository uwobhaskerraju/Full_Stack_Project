import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dsongdetails',
  templateUrl: './dsongdetails.component.html',
  styleUrls: ['./dsongdetails.component.css']
})
export class DsongdetailsComponent implements OnInit {
  songDetails = [];
  imagePath: String;
  songReviews: Object
  songID: String
  private routeSub: Subscription;
  public uSong: any = {}; // used for getting ratings and review of a song


  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state.state as
      {
        allSongs: Object
      };

    this.songDetails.push(state.allSongs)
    console.log("first state")
    console.log(this.songDetails)

    //get logged in details like id and name
    this.uSong.id = localStorage.getItem('id')
    this.uSong.name = localStorage.getItem('name')
    this.uSong.email = localStorage.getItem('email')
    // this.uSong.id=localStorage.getItem('id')
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('email')

    console.log("uSong")
    console.log(this.uSong)
  }

  ngOnInit() {
    this.imagePath = environment.imagePath;
    this.routeSub = this.route.params.subscribe(params => {
      //console.log(params) //log the entire params object
      // console.log(params['id']) //log the value of id
      //console.log(this.songDetails)
      this.songID = params['id']
    });

    // send API to get review of this song
    this._http.getSongReviews(this.songID)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          this.songReviews = data["result"]
          console.log(this.songReviews)
        }
        else {
          // toast saying false
        }
      });
  }
  ngOnDestroy() {
    this.songDetails = null
    this.songReviews = null
    this.songID = null
    this.routeSub.unsubscribe();
  }
  submitRateReview(value) {
    
    console.log(this.uSong)
    console.log(value)
    this._http.submitRating(this.uSong, value)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          // toast saying yes
          console.log("inserted rating")
          // trigger review api
          this._http.submitReview(this.uSong, value)
          .subscribe(data=>{
            if(data["statusCode"]==200)
            {
              // toast saying yes
              console.log("inserted review")
            }
            else{
              // delete rating
              this._http.deleteRating(data["result"]).subscribe(
                d=>{
                  console.log("deleted rating as insert rating failed")
                }
              );
            }
          });
        }
        else {
          // toast saying falied
          console.log("insert rating failed")
        }
      });

      this.ngOnInit();
  }

  generateRandNum() {
    console.log("called")
    return Math.floor(Math.random() * environment.iconsLen) + 1;
  }
  doSomething(s) {
    console.log(s)
  }
  goBack() {
    this.songDetails = null
    this.songReviews = null
    this.songID = null
    this.router.navigate(['/dashboard']);
  }

}
