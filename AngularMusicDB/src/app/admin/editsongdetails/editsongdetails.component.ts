import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ValidationServiceService } from '../../validations/validation-service.service'


declare var M: any;
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
  temp: boolean;
  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute, private _validate: ValidationServiceService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state.state as
      {
        allSongs: Object
      };
    this.songDetails.push(state.allSongs)
    //console.log("song details")
    //console.log(this.songDetails)
  }

  deleteSong(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    this._http.adminDeleteSong(songID)
      .subscribe(d => {
        console.log(d)
        if (d["statusCode"] == 200) {
          // yes
          M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
          this.router.navigate(['/admin/song'])
        }
        else {
          //no 
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      });
  }
  deleteReview(value: any) {
    var id=value.srcElement.id
    //console.log(id)
    this._http.deleteReview(id)
      .subscribe(data => {
        console.log(data)
        if (data["statusCode"] == 200) {
          // toast saying yes
          M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
          this.ngOnInit();
        }
        else {
          // toasy saying no
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      });
  }
  updateSong(value: any) {
    //validate duration and year
    let errMsg = ''
    errMsg = errMsg.concat(this._validate.validateYear(this.songDetails[0].year))
    errMsg = errMsg.concat(this._validate.validateDuration(this.songDetails[0].duration))
    if (!Boolean(this.songDetails[0].name) || String(this.songDetails[0].name).length > 15 ||
      !Boolean(this.songDetails[0].album) || String(this.songDetails[0].album).length > 15 ||
      !Boolean(this.songDetails[0].artist) || String(this.songDetails[0].artist).length > 15 ||
      !Boolean(this.songDetails[0].genre) || String(this.songDetails[0].genre).length > 15) {
      errMsg = errMsg.concat(this._validate.fieldsErr)
    }
    if (!Boolean(errMsg)) {
      let songID = value.srcElement.id.split('_')[0]
      console.log(this.songDetails)
      this._http.adminUpdateSong(this.songDetails, songID)
        .subscribe(d => {
          if (d["statusCode"] == 200) {
            M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
          }
          else {
            console.log(d)
            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
          }
        });
    }
    else {
      this._validate.generateToast(errMsg)
    }

  }

  ngOnInit() {
    this.imagePath = environment.imagePath;
    M.AutoInit();
    M.updateTextFields();
    var textNeedCount = document.querySelectorAll('input');
    M.CharacterCounter.init(textNeedCount);

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
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
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
