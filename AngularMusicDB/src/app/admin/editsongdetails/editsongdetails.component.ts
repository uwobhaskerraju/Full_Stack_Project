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
export class EditsongdetailsComponent implements OnInit, AfterViewChecked {
  ngAfterViewChecked(): void {
    if (!this.temp) {
      for (var i = 0; document.getElementsByTagName('label').length; i++) {
        if (document.getElementsByTagName('label')) {
          document.getElementsByTagName('label').item(i).classList.add('active');
          this.temp = true
        }

      }
    }

  }
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
    console.log("song details")
    console.log(this.songDetails)
  }

  deleteSong(value: any) {
    let songID = value.srcElement.id.split('_')[0]
    this._http.adminDeleteSong(songID)
      .subscribe(d => {
        if (d["statusCode"] == 200) {
          // yes
          M.toast({ html: 'Song deleted Sucessfully', classes: 'rounded' })
        }
        else {
          //no 
          M.toast({ html: 'Song delete Failed', classes: 'rounded' })
        }
      });
  }

  updateSong(value: any) {
    //validate duration and year
    let errMsg = ''
    errMsg = errMsg.concat(this._validate.validateYear(this.songDetails[0].Year))
    errMsg = errMsg.concat(this._validate.validateDuration(this.songDetails[0].Duration))
    if (Boolean(this.songDetails[0].Name) &&
      Boolean(this.songDetails[0].Album) &&
      Boolean(this.songDetails[0].Artist) &&
      Boolean(this.songDetails[0].Genre)) {
      errMsg = errMsg.concat('error')
    }
    if (Boolean(errMsg)) {
      let songID = value.srcElement.id.split('_')[0]
      console.log(this.songDetails)
      this._http.adminUpdateSong(this.songDetails, songID)
        .subscribe(d => {
          if (d["statusCode"] == 200) {
            M.toast({ html: 'Song Updated Sucessfully', classes: 'rounded' })
          }
          else {
            console.log(d)
            M.toast({ html: 'Song Update Failed', classes: 'rounded' })
          }
        });
    }
    else {
      M.toast({ html: 'All inputs are mandatory.update failed', classes: 'rounded' })
    }

    //this.ngOnInit();
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
