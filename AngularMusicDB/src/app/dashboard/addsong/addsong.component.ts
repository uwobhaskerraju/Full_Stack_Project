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
    this.addSong.id = this._validate.loggedInUser['id']
    this.addSong.name = this._validate.loggedInUser['name']
    this.addSong.email = this._validate.loggedInUser['email']
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
    //console.log(this.addSong)
    let errMsg = ''
    errMsg = errMsg.concat(this._validate.validateYear(this.addSong.year))
    errMsg = errMsg.concat(this._validate.validateDuration(this.addSong.duration))
    errMsg = errMsg.concat(this._validate.validaterating(this.addSong.rate))
    errMsg = errMsg.concat(this._validate.validatereview(this.addSong.review))

    if (!Boolean(this.addSong.title) || !(String(this.addSong.title).length < 15) ||
      !Boolean(this.addSong.album) || !(String(this.addSong.album).length < 15) ||
      !Boolean(this.addSong.artist) || !(String(this.addSong.artist).length < 15) ||
      !Boolean(this.addSong.genre) || !(String(this.addSong.genre).length < 15)) {
      errMsg = errMsg.concat(this._validate.fieldsErr)
    }
    if (!Boolean(errMsg)) {
      this._http.addSongToDB(this.addSong)
        .subscribe(data => {
          console.log(data)
          if (data["statusCode"] == 200) {
            // successfully inserted songID
            //console.log("inserted song")
            // insert rating

            songID = data["result"]
            console.log(this.addSong)
            this._http.submitRating(this.addSong, songID)
              .subscribe(data => {
                console.log(data)
                if (data["statusCode"] == 200) {
                  // toast saying yes
                  //console.log("inserted rating")

                  // trigger review api
                  this._http.submitReview(this.addSong, songID)
                    .subscribe(data => {
                      console.log(data)
                      if (data["statusCode"] == 200) {
                        // toast saying yes

                        // console.log("inserted review")
                        M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
                        this.ngOnInit();
                      }
                      else {
                        // delete rating
                        this._http.deleteRating(data["result"]).subscribe(
                          d => {
                            //console.log("deleted rating as insert rating failed")
                            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
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
                      M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
                    });
                }
              });
          }
          else {
            // toast saying falied
            console.log("insert song failed")
            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
          }
        });
    }
    else {
      this._validate.generateToast(errMsg);
      //M.toast({ html: 'All inputs are mandatory.update failed', classes: 'rounded' })
    }
  }
}
