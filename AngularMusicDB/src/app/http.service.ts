import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  currentMethod: string;
  constructor(private http: HttpClient) { }

  // open APIs
  getTopTenSongs() {
    let URL = 'http://localhost:8080/api/open/songs/ten'
    return this.http.get(URL);
  }

  getSongReviews(songID: any) {
    let url = environment.apiBaseURL + 'open/review/' + songID;
    let headers = this.getBasicHeaders()
    return this.http.get(url, headers);
  }
  // end of open APIs
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

  registerUser(name,pass,email) {
    
    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = environment.apiBaseURL+'user/register'
    console.log(URL)

    var JsnData = JSON.stringify({
      username: name,
      email: pass,
      password: email
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

  getBasicHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'

      }
    };
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
    let url = environment.apiBaseURL+'admin/user'
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

  toggleAdmin(id: String, active: boolean){
    let url = environment.apiBaseURL+'admin/user/admin'
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
      isAdmin: active
    })
    console.log(url)
    console.log(header)
    console.log(JsnData)
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
      Genre: user.genre
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
      , body: JsnData
    }

    return this.http.delete(url, httpOptions);
  }

  delPlaylist(playListID: any) {
    let url = environment.apiBaseURL + 'admin/playlist'
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
      body: JsnData
    }
    return this.http.delete(url, httpOptions)
  }

  deleteReview(reviewID:String)
  {
    let url=environment.apiBaseURL+'admin/review'
    var JsnData = JSON.stringify({
      reviewid: reviewID
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }),
      body: JsnData
    }
    return this.http.delete(url, httpOptions)
  }
  adminDeleteSong(songID) {
    let url = environment.apiBaseURL + 'admin/song'
    //let header=this.getHeader()
    var JsnData = JSON.stringify({
      songID: songID
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }),
      body: JsnData
    }
    return this.http.delete(url, httpOptions)
  }

  adminUpdateSong(song:any){
    let url=environment.apiBaseURL+'admin/song'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
     
    })

    return this.http.post(url, JsnData, header);

  }

  // end of admin APIs


  // start of user API

  getAllsongs() {
    let url = environment.apiBaseURL + 'secure/song'
    let header = this.getHeader()
    return this.http.get(url, header);
  }

  submitRating(value: any, songid: any) {
    let url = environment.apiBaseURL + 'secure/rate'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      songID: songid,
      userName: value.name,
      ratings: value.rate,
      userID: value.id
    })
    return this.http.post(url, JsnData, header)
  }

  submitReview(value: any, songID: any) {
    let url = environment.apiBaseURL + 'secure/review'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      songId: songID,
      comment: value.review,
      reviewBy: value.name,
      userId: value.id
    })
    return this.http.post(url, JsnData, header)
  }

  deleteRating(rateid) {
    let url = environment.apiBaseURL + 'secure/rate'
    //let header=this.getHeader()
    var JsnData = JSON.stringify({
      rateID: rateid
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }),
      body: JsnData
    }
    return this.http.delete(url, httpOptions)
  }

  deleteSong(songID) {
    let url = environment.apiBaseURL + 'secure/song'
    //let header=this.getHeader()
    var JsnData = JSON.stringify({
      songID: songID
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }),
      body: JsnData
    }
    return this.http.delete(url, httpOptions)
  }
  addSongToDB(value) {
    let url = environment.apiBaseURL + 'secure/song'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    };
    var JsnData = JSON.stringify({
      Name: value.title,
      Artist: value.artist,
      Album: value.album,
      Duration: value.duration,
      Year: value.year,
      Genre: value.genre,
      Hidden: value.hideSong
    })
    console.log(JsnData)

    return this.http.post(url, JsnData, header)
  }
  addPlayListUser(playlist: any) {
    let url = environment.apiBaseURL + 'secure/playlist'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      title: playlist.title,
      description: playlist.description,
      ownerID: playlist.id,
      songID: []
    })

    return this.http.post(url,JsnData,header)
    // end of user API
  }
}