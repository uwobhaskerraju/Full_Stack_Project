import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ValidationServiceService } from 'src/app/validations/validation-service.service';
declare var M: any
@Component({
  selector: 'app-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.css']
})
export class AddsongComponent implements OnInit {
  public addSong: any = {};
  constructor(private _http: HttpService, private _validate: ValidationServiceService) {
    this.addSong.id = localStorage.getItem('id')
    this.addSong.name = localStorage.getItem('name')
    this.addSong.email = localStorage.getItem('email')
  }
  ngOnDestroy() {
    this.addSong = null

    // this.routeSub.unsubscribe();
  }
  ngOnInit() {
    M.AutoInit();
    M.updateTextFields();
    var textNeedCount = document.querySelectorAll('input');
    var textaNeedCount = document.querySelectorAll('textarea');
    M.CharacterCounter.init(textNeedCount);
    M.CharacterCounter.init(textaNeedCount);
  }
  addSongToDB() {
    // add song to DB
    let songID = null
    console.log(this.addSong)
    let errMsg = ''
    errMsg = errMsg.concat(this._validate.validateYear(this.addSong.year))
    errMsg = errMsg.concat(this._validate.validateDuration(this.addSong.duration))
    errMsg = errMsg.concat(this._validate.validaterating(this.addSong.rate))
    errMsg = errMsg.concat(this._validate.validatereview(this.addSong.review))

    if (!Boolean(this.addSong.title) &&
      !Boolean(this.addSong.album) &&
      !Boolean(this.addSong.artist) &&
      !Boolean(this.addSong.genre)) {
      errMsg = errMsg.concat('fields shouldnt be empty')
    }
    if (!Boolean(errMsg)) {
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
                        M.toast({ html: 'song inserted', classes: 'rounded' })
                        this.ngOnInit();
                      }
                      else {
                        // delete rating
                        this._http.deleteRating(data["result"]).subscribe(
                          d => {
                            console.log("deleted rating as insert rating failed")
                            M.toast({ html: 'insert operation failed', classes: 'rounded' })
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
                      M.toast({ html: 'insert operation failed', classes: 'rounded' })
                    });
                }
              });
          }
          else {
            // toast saying falied
            console.log("insert song failed")
            M.toast({ html: 'insert operation failed', classes: 'rounded' })
          }
        });
    }
    else {
      this._validate.generateToast(errMsg);
      //M.toast({ html: 'All inputs are mandatory.update failed', classes: 'rounded' })
    }
  }
}
