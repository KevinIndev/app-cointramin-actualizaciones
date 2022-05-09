import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public url: string | string[] | undefined;
  public headers: HttpHeaders | undefined;
  constructor(private _http: HttpClient) {
    this.url = global.serverUrl + 'users'
   }

  public Login(params:{}):Observable<any>{
    return this._http.post(`${this.url}/login`, params, {headers: this.headers});
  }
}
