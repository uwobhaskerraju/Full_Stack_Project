import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


function annotateName(target, name, desc) {
  var method = desc.value;
  desc.value = function () {
      var prevMethod = this.currentMethod;
      this.currentMethod = name;
      method.apply(this, arguments);
      this.currentMethod = prevMethod;   
  }
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  currentMethod: string;
  constructor(private http: HttpClient) { }

  getTopTenSongs(){
    let URL='http://localhost:8080/api/open/songs/ten'
      return this.http.get(URL);
  }
  ValidateLogin(email:any,pass:any){
    console.log("inside validatelogin")
    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = 'http://localhost:8080/api/user/login'
    console.log(URL)

    var JsnData = JSON.stringify({
      email: email,
      password: pass
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

  registerUser(value:any){
    console.log("inside registerUser")
    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = 'http://localhost:8080/api/user/register'
    console.log(URL)

    var JsnData = JSON.stringify({
      username:value.uName,
      email: value.email,
      password: value.uPass
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
  //@annotateName
  verifyAndRedirect(id:String){
  
   // console.log("inside "+this.currentMethod);
    let URL='http://localhost:8080/api/secure/user/'
    console.log(URL);
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'
      }}
      var JsnData = JSON.stringify({
        userID:id
      })
      return this.http.put(URL,JsnData,header);
  }
}
