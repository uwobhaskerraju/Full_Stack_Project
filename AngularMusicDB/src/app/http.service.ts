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
    let URL = environment.apiBaseURL + 'open/songs/ten'
    return this.http.get(URL);
  }

  getSongReviews(songID: any) {
    let url = environment.apiBaseURL + 'open/review/' + songID;
    let headers = this.getBasicHeaders()
    return this.http.get(url, headers);
  }

  getSearchedSongs(query: String) {
    let url = environment.apiBaseURL + '/open/search/' + query;
    let headers = this.getBasicHeaders()
    return this.http.get(url, headers);
  }

  // end of open APIs
  ValidateLogin(email: any, pass: any) {
    //console.log("inside validatelogin")
    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = environment.apiBaseURL + 'user/login'
    //console.log(URL)

    var JsnData = JSON.stringify({
      email: email,
      password: pass
    })
    //console.log(JsnData)
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'
      }

    }
    //console.log(header)
    return this.http.post(URL, JsnData, header);
  }

  registerUser(name, pass, email) {

    //let URL = 'http://' + window.location.host + '/insertNewItem'
    let URL = environment.apiBaseURL + 'user/register'
    console.log(URL)

    var JsnData = JSON.stringify({
      username: name,
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
  hidePlaylist(id: string, active: boolean) {
    let url = environment.apiBaseURL + 'admin/playlist/hide'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    }
    var JsnData = JSON.stringify({
      playListID: id,
      hidden: active
    })
    return this.http.put(url, JsnData, header)
  }
  actDeactUser(id: String, active: boolean) {
    let url = environment.apiBaseURL + 'admin/user'
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

  toggleAdmin(id: String, active: boolean) {
    let url = environment.apiBaseURL + 'admin/user/admin'
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

  getallUsers(userID: any) {
    let url = environment.apiBaseURL + 'admin/users/' + userID
    let header = this.getHeader()
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

  addPlaylist(title, desc, adminID) {
    let url = environment.apiBaseURL + 'admin/playlist'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      title: title,
      description: desc,
      ownerID: adminID
    })
    console.log(JsnData)
    return this.http.post(url, JsnData, header);
  }

  addSongPlaylistAdmin(songID, playlistID) {
    let url = environment.apiBaseURL + 'admin/playlist/song'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      playListID: playlistID,
      songID: songID
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
    console.log(httpOptions)
    return this.http.put(url, JsnData, header);
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

  deleteReview(reviewID: String) {
    let url = environment.apiBaseURL + 'admin/review'
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
    console.log(httpOptions)
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

  adminUpdateSong(song: any, songID: any) {
    let url = environment.apiBaseURL + 'admin/song'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      songID: song[0]._id,
      Name: song[0].name,
      Artist: song[0].artist,
      Album: song[0].album,
      Duration: song[0].duration,
      Year: song[0].year,
      Genre: song[0].genre,
      Hidden: song[0].hidden
    })
    //console.log(JsnData)
    return this.http.put(url, JsnData, header);

  }

  editPlaylistAdmin(playlistid: string, title: string, description: string) {
    let url = environment.apiBaseURL + 'admin/playlist'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      playListID: playlistid,
      title: title,
      description: description
    })
    //console.log(JsnData)
    return this.http.put(url, JsnData, header);
  }

  // end of admin APIs

  // start of user APIs
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

    return this.http.post(url, JsnData, header)
    // end of user API
  }

  getUserPlaylists(user: string) {
    let url = environment.apiBaseURL + 'secure/playlist/' + user
    console.log(url)
    let header = this.getHeader();
    return this.http.get(url, header)
  }

  addSongPlaylistUser(playListID: any, songsID: any, userID: any) {
    let url = environment.apiBaseURL + 'secure/playlist/song'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      playListID: playListID,
      songID: songsID,
      ownerID: userID
    })
    return this.http.put(url, JsnData, header)
  }


  hideUserPlaylist(id: string, active: boolean, userID: any) {
    let url = environment.apiBaseURL + 'secure/playlist/hide'
    let header = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }
    }
    var JsnData = JSON.stringify({
      playListID: id,
      hidden: active,
      ownerID: userID
    })
    return this.http.put(url, JsnData, header)
  }

  removeSongUserPlaylist(songid, playlistid, userID) {
    let url = environment.apiBaseURL + 'secure/playlist/song'
    //let header = this.getHeader()
    var JsnData = JSON.stringify({
      playListID: playlistid,
      songID: songid,
      ownerID: userID
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
  editPlaylistUser(playlistid: string, title: string, description: string, user: String) {
    let url = environment.apiBaseURL + 'secure/playlist'
    let header = this.getHeader()
    var JsnData = JSON.stringify({
      playListID: playlistid,
      title: title,
      description: description,
      ownerID: user
    })
    //console.log(JsnData)
    return this.http.put(url, JsnData, header);
  }

  getAllUserPlaylists() {
    let url = environment.apiBaseURL + 'secure/getPlaylists'
    let header = this.getHeader()
    return this.http.get(url, header)
  }

  getUserSearchedSongs(query: String) {
    let url = environment.apiBaseURL + '/secure/search/' + query;
    let headers = this.getHeader()
    return this.http.get(url, headers);
  }
}