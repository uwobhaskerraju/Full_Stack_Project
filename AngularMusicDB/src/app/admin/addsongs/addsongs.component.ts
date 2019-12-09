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
    errMsg = errMsg.concat(this._validate.validateYear(this.song.Year))
    errMsg = errMsg.concat(this._validate.validateDuration(this.song.Duration))
    if (Boolean(this.song.Name) &&
      Boolean(this.song.Album) &&
      Boolean(this.song.Artist) &&
      Boolean(this.song.Genre)) {
      errMsg = errMsg.concat('error')
    }
    if (!Boolean(errMsg)) {
      this._http.addSong(this.song).subscribe(data => {
        if (data["statusCode"] == 200) {
          M.toast({ html: 'Song added Sucessfully', classes: 'rounded' })
        }
        else {
          M.toast({ html: 'operation failed', classes: 'rounded' })
        }
      });
    }
    else {
      M.toast({ html: 'All inputs are mandatory.update failed', classes: 'rounded' })
    }

  }

}
