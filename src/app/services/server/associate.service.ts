import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  private url: string | string[] | undefined;
  private token: string | string[];
  private headers: HttpHeaders | undefined;

  constructor(private _http: HttpClient) { 
    this.url = global.serverUrl + 'associates';
    this.token = 'SKMANXBSCD_';
    this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.token)
  }

  public GetList(): Observable<any>{
    return this._http.get(`${this.url}/list`, {headers: this.headers});
  }
}
