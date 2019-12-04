import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getTopTenSongs(){
    let URL='http://localhost:8080/api/open/songs/ten'
      return this.http.get(URL);
  }
}
