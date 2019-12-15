import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationServiceService } from 'src/app/validations/validation-service.service';

declare var M: any

@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.component.html',
  styleUrls: ['./createplaylist.component.css']
})
export class CreateplaylistAdminComponent implements OnInit {
  adminID: any
  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute,
    private _validate: ValidationServiceService) {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as
    //   {
    //     id: string
    //   };
    // this.adminID = state;
    this.adminID = this._validate.loggedInUser["id"]
    //console.log(this.adminID.state["id"])
  }

  ngOnInit() {
  }
  addPlayListAdmin(title, desc) {
    let errMsg = ''
    errMsg = errMsg.concat(this._validate.validateTitle(String(title).trim()))
    errMsg = errMsg.concat(this._validate.validateTitle(String(desc).trim()))
    if (!Boolean(errMsg)) {
      this._http.addPlaylist(title, desc, this.adminID)
        .subscribe(d => {
          console.log(d)
          if (d["statusCode"] == 200) {
            M.toast({ html: this._validate.succOpMsg, classes: 'rounded' })
            this.ngOnInit()
          }
          else {
            M.toast({ html: this._validate.OpFailedMsg, classes: 'rounded' })
          }
        });
    }
    else {
      this._validate.generateToast(errMsg);
    }

  }
}
