import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ValidationServiceService } from 'src/app/validations/validation-service.service';
declare var M: any;
@Component({
  selector: 'app-addsongs',
  templateUrl: './addsongs.component.html',
  styleUrls: ['./addsongs.component.css']
})
export class AddsongsComponent implements OnInit {

  public song: any = {};
  constructor(private _http: HttpService, private _validate: ValidationServiceService) { }

  ngOnInit() {
    //this.song=localStorage.getItem('id')
  }

  addSong() {
    console.log(this.song)
    let errMsg = ''
    errMsg = errMsg.concat(this._validate.validateYear(this.song.year))
    errMsg = errMsg.concat(this._validate.validateDuration(this.song.duration))
    if (!Boolean(this.song.title) ||
      !Boolean(this.song.album) ||
      !Boolean(this.song.artist) ||
      !Boolean(this.song.genre)) {
      errMsg = errMsg.concat('all input fields are mandatory')
    }
    console.log(errMsg)
    if (!Boolean(errMsg)) {
      this._http.addSong(this.song).subscribe(data => {
        console.log(data)
        if (data["statusCode"] == 200) {
          M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
        }
        else {
          M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
        }
      });
    }
    else {
      this._validate.generateToast(errMsg)
    }

  }

}
