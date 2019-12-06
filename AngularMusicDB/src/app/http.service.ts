import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  currentMethod: string;
  constructor(private http: HttpClient) { }

  getTopTenSongs() {
    let URL = 'http://localhost:8080/api/open/songs/ten'
    return this.http.get(URL);
  }
  ValidateLogin(email: any, pass: any) {
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

  registerUser(value: any) {
    console.log("inside registerUser")
    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = 'http://localhost:8080/api/user/register'
    console.log(URL)

    var JsnData = JSON.stringify({
      username: value.uName,
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

  getHeader() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    };
  }
  verifyAndRedirect(id: String) {

    // console.log("inside "+this.currentMethod);
    let URL = 'http://localhost:8080/api/secure/user/'
    console.log(URL);
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    }
    var JsnData = JSON.stringify({
      userID: id
    })
    return this.http.put(URL, JsnData, header);
  }

  //admin APIs
  actDeactUser(id: String, active: boolean) {
    let url = 'http://localhost:8080/api/admin/user'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    }
    var JsnData = JSON.stringify({
      userID: id,
      isActive: active
    })
    return this.http.put(url, JsnData, header)
  }

  getallUsers() {
    let url = 'http://localhost:8080/api/admin/users'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    }
    return this.http.get(url, header)
  }

  getAllSongs() {
    let url = environment.apiBaseURL + 'admin/songs'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    }
    return this.http.get(url, header)
  }

  getAllPlaylists() {
    let url = environment.apiBaseURL + 'admin/playlist'
    let header = this.getHeader();
    return this.http.get(url, header)
  }

  addSong(user: any) {
    let url = environment.apiBaseURL + 'admin/song'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    };
    var JsnData = JSON.stringify({
      Name: user.title,
      Artist: user.artist,
      Album: user.album,
      Duration: user.duration,
      Year: user.year,
      Genre: user.genre,
      Hidden: user.hideSong,
      Picture: "environment.defaultPicture"
    })
    console.log(JsnData)

    return this.http.post(url, JsnData, header)


  }

  addPlaylist(playlist: any, id: any) {
    let url = environment.apiBaseURL + 'admin/playlist'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      title: playlist.title,
      description: playlist.description,
      ownerID: id,
      songID: []
    })

    return this.http.post(url, JsnData, header);
  }

  removeSongPlaylist(songid, playlistid) {
    let url = environment.apiBaseURL + 'admin/playlist/song'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      playListID: playlistid,
      songID: songid
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      })
      ,body:JsnData
    }

    return this.http.delete(url,httpOptions);
  }

  delPlaylist(playListID:any){
    let url=environment.apiBaseURL+'admin/playlist'
    var JsnData = JSON.stringify({
      playListID: playListID
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }),
      body:JsnData
    }
    return this.http.delete(url,httpOptions)
  }
  // end of admin APIs
}
