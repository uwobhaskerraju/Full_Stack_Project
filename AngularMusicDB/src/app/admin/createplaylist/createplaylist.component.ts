import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var M:any

@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.component.html',
  styleUrls: ['./createplaylist.component.css']
})
export class CreateplaylistAdminComponent implements OnInit {
  adminID:any
  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
      {
        id: string
      };
    this.adminID = state;
    //console.log(this.adminID.state["id"])
  }

  ngOnInit() {
  }
  addPlayListAdmin(title,desc) {
    this._http.addPlaylist(title,desc,this.adminID.state["id"])
      .subscribe(d => {
        console.log(d)
        if (d["statusCode"] == 200) {
          M.toast({ html: 'Playlist created.', classes: 'rounded' })
          this.ngOnInit()
        }
        else {
          M.toast({ html: 'Playlist creation failed.', classes: 'rounded' })
        }
      });
  }
}
