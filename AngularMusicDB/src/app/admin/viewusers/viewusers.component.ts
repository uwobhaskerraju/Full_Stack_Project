import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  allUsers: Object
  constructor(private _http: HttpService, private router: Router) { }

  ngOnInit() {
    // get all users API
    this._http.getallUsers().subscribe(data => {
      if (data["statusCode"] = 200) {

        this.allUsers = data["result"]
        data["result"].forEach(s => {
          if (s.usertype == "admin") {
            s.admin = true
          }
          else {
            s.admin = false
          }
        });
        console.log(data["result"])
      }
      else {
        //unable to fetch users
      }
    });

  }

  checkAll(value: any) {
    console.log(value.srcElement.checked)
    console.log(value.srcElement.id)
    // 1- admin , 2- active
    switch (Number(value.srcElement.id.split('_')[1])) {
      case 1:
        // hit make admin API
        this._http.toggleAdmin(value.srcElement.id.split('_')[0], Boolean(value.srcElement.checked))
        .subscribe(data => {
          console.log(data)
          if (data["statusCode"] == 200) {
            //toast 
            console.log("admin changed")
          }
          else {
            //toast
            console.log("failed admin changed")
          }
        });
        break;
      case 2:
        // hit make active API
        this._http.actDeactUser(value.srcElement.id.split('_')[0], Boolean(value.srcElement.checked))
          .subscribe(data => {
            console.log(data)
            if (data["statusCode"] == 200) {
              //toast 
              console.log("user changed")
            }
            else {
              //toast
              console.log("failed changed")
            }
          });
        break;
    }
  }

}
