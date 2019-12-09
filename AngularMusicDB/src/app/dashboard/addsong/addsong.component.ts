import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.css']
})
export class AddsongComponent implements OnInit {
  public addSong: any = {};
  constructor(private _http: HttpService) {
    this.addSong.id = localStorage.getItem('id')
    this.addSong.name = localStorage.getItem('name')
    this.addSong.email = localStorage.getItem('email')
  }
  ngOnDestroy() {
    this.addSong = null
    
    // this.routeSub.unsubscribe();
  }
  ngOnInit() {
  }
  addSongToDB() {
    // add song to DB
    let songID = null;
    this._http.addSongToDB(this.addSong)
      .subscribe(data => {
        if (data["statusCode"] == 200) {
          // successfully inserted songID
          console.log("inserted song")
          // insert rating
          songID = data["result"]
          this._http.submitRating(this.addSong, songID)
            .subscribe(data => {
              if (data["statusCode"] == 200) {
                // toast saying yes
                console.log("inserted rating")
                // trigger review api
                this._http.submitReview(this.addSong, songID)
                  .subscribe(data => {
                    if (data["statusCode"] == 200) {
                      // toast saying yes
                      console.log("inserted review")
                    }
                    else {
                      // delete rating
                      this._http.deleteRating(data["result"]).subscribe(
                        d => {
                          console.log("deleted rating as insert rating failed")
                        }
                      );
                    }
                  });
              }
              else {
                // toast saying falied
                console.log("insert rating failed")
                // delete song as insert rating failed
                this._http.deleteSong(songID)
                  .subscribe(d => {
                    console.log("succesfully deleted song as insert rating failed")
                  });
              }
            });
        }
        else {
          // toast saying falied
          console.log("insert song failed")
        }
      });
  }
}
