import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allUsers: Object
  allSongs: Object
  state:Object
  public song: any = {};
  public playlist: any = {};

  constructor(private _http: HttpService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as
     {
      email: string,
      id: string,
      name: string,
      type:string,
      emailverified:string
    };
    this.state=state;
  }
 

  ngOnInit() {
    localStorage.setItem('ACCESS_TOKEN', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaWJoYXNrZXJyYWp1QG91dGxvb2suY29tIiwiaWQiOiI1ZGU0YjJlNzIyYzg0NjEyYjgwMTAxMGIiLCJuYW1lIjoic2FpIiwiZW1haWx2ZXJpZmllZCI6ZmFsc2UsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE1NzU1NjYwOTV9.xhTiB3fAb4aCyPrWqtUIw4eEz2BFLL_dL5MQBTVjYHk")

    const elem = document.querySelector('.tabs');
    const options = {};
    M.Tabs.init(elem, options);

    // get all users API
    this._http.getallUsers().subscribe(data => {
      if (data["statusCode"] = 200) {

        this.allUsers = data["result"]
      }
      else {
        //unable to fetch users
      }

    });
    // get all songs 
    this._http.getAllSongs().subscribe(data => {
      if (data["statusCode"] = 200) {

        this.allSongs = data["result"]
      }
      else {
        //unable to fetch users
      }

    });
  }
  addPlaylist() {
    this._http.addPlaylist(this.playlist,this.state["id"])
    .subscribe(data=>{
      if(data["statusCode"]==200){
        // say good
        //clear the form
      }
      else{
        // throw a toast
      }
    });
    
  }

  addSong() {
    this._http.addSong(this.song).subscribe(
      data => {

        if (data["statusCode"] == 200) {
          // toast saying added
          //clear the form
    
        }
        else {
          //unable to insert
          //toast saying something went wrong
        
        }
      }
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
