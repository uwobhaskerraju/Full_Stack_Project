import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})


export class VerifyComponent implements OnInit {

  email:String;
  name:String;
  id:String;
  
  
  constructor(private _http: HttpService,private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      email: string,
      id: string,
      name: string
    };
    this.email=state.email;
    this.name=state.name;
    this.id=state.id;
  }

  ngOnInit() {
    
  }
  
  verifyAndRedirect(id){
    this._http.verifyAndRedirect(id)
    .subscribe(data=>{
      console.log(data)
    });
  }

}
