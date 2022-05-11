import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformations } from 'src/app/models/informations/personal-informations';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationsService {

  private url : string | string[];
  private token: string | string[];
  private headers: HttpHeaders;
  constructor(private _user_service: UserService,
              private _http: HttpClient) { 
                this.token = _user_service.getToken();
                this.url = global.serverUrl + 'associate/';
                this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                                .set('Authorization', this.token);
              }
  
  public GetInformations(params_id:string):Observable<any>{
    return this._http.get(`${this.url}personal-informations/${params_id}`, {headers: this.headers});
  }

  public AddInformations(params:PersonalInformations):Observable<any>{
    return this._http.post(`${this.url}personal-informations/add`, params, {headers: this.headers});
  }
}
