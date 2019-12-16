import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewsongdetails',
  templateUrl: './viewsongdetails.component.html',
  styleUrls: ['./viewsongdetails.component.css']
})
export class ViewsongdetailsComponent implements OnInit {
  songDetails = [];
  imagePath: String;
  songID: String
  songReviews: Object
  private routeSub: Subscription;


  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state.state as
      {
        allSongs: Object
      };

    this.songDetails.push(state.allSongs)
    console.log("song detils")
    console.log(this.songDetails)
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
    this.router.navigate(['/admin/song']);
  }
}
