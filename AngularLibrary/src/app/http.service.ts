import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  // after user clicks on login
  ValidateLogin(value: any) {
    console.log("inside validatelogin")
    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = 'http://localhost:8080/api/user/login'
    console.log(URL)

    var JsnData = JSON.stringify({
      email: value.Email,
      password: value.Password
    })
    console.log(JsnData)
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'
      }

    }

    console.log(header)
    return this.http.post(URL, JsnData, header);
  }

    getTopSongs(){
      let URL='http://localhost:8080/api/open/songs/ten'
      return this.http.get(URL);
    }

}
