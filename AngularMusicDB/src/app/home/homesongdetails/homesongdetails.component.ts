import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.prod'


@Component({
  selector: 'app-homesongdetails',
  templateUrl: './homesongdetails.component.html',
  styleUrls: ['./homesongdetails.component.css']
})
export class HomesongdetailsComponent implements OnInit {
  songDetails=[];
  imagePath: String;
  songReviews: Object
  songID: String
  private routeSub: Subscription;

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
      {
        allSongs: Object
      };

    this.songDetails.push(state.allSongs)
    // console.log("first state")
    console.log(this.songDetails)
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
          //console.log(this.songReviews)
        }
        else {
          // toast saying false
        }
      });


    // console.log("songs")
    //console.log(this.songDetails)
  }
  ngOnDestroy() {
    this.songDetails = null
    this.songReviews = null
    this.songID = null
    this.routeSub.unsubscribe();
  }

  generateRandNum() {
    return Math.floor(Math.random() * environment.iconsLen) + 1;
  }
  goBack() {
    this.songDetails = null
    this.songReviews = null
    this.songID = null
    this.router.navigate(['/']);
  }
}
