import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EconomicActivity } from 'src/app/models/informations/economic-activity';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class EconomicActivityService {

  private url: string | string[];
  private token: string | string[];
  private headers: HttpHeaders;
  constructor(private _http: HttpClient,
              private _user_service: UserService) { 
                this.token = _user_service.getToken();
                this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                                .set('Authorization', this.token);
                this.url = global.serverUrl + 'associate';
              }
  
  public GetInformations(params_id:string):Observable<any>{
    return this._http.get(`${this.url}/economic-activity/${params_id}`, {headers: this.headers});
  }

  public Add(params:EconomicActivity):Observable<any>{
    return this._http.post(`${this.url}/economic-activity/add`, params, {headers: this.headers});
  }
}
