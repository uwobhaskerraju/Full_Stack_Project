import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ValidationServiceService } from 'src/app/validations/validation-service.service';
declare var M: any
@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.component.html',
  styleUrls: ['./createplaylist.component.css']
})
export class CreateplaylistComponent implements OnInit {
  public playlist: any = {};
  constructor(private _http: HttpService, private _validate: ValidationServiceService) {
    // this.playlist.id = localStorage.getItem('id')
    // this.playlist.name = localStorage.getItem('name')
    // this.playlist.email = localStorage.getItem('email')
    this.playlist.id = this._validate.loggedInUser["id"]
    this.playlist.name = this._validate.loggedInUser["name"]
    this.playlist.email = this._validate.loggedInUser["email"]
    console.log(this.playlist)
  }

  ngOnInit() {
    M.updateTextFields();
  }
  ngOnDestroy() {
    this.playlist = null
    // this.routeSub.unsubscribe();
  }

  addPlayListUser() {
    let errMsg = ''
    //validate title and descr

    errMsg = errMsg.concat(this._validate.validateDesc(this.playlist.description))
    errMsg = errMsg.concat(this._validate.validateTitle(this.playlist.title))
    if (!Boolean(errMsg)) {
      this._http.addPlayListUser(this.playlist).subscribe(
        
        data => {
          console.log(data)
          if (data["statusCode"] == 200) {
            // playlist created
            M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
            this.ngOnInit();
          }
          else {
            // toast
            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
            this.ngOnInit();
          }
        }
      );

    }
    else {
      this._validate.generateToast(errMsg)
    }
  }
}
