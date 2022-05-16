import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DependentsInformations } from 'src/app/models/informations/dependents-informations';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class DependentsInformationsService {

  private url: string | string[];
  private token: string | string[];
  private headers: HttpHeaders;

  constructor(private _user_service: UserService,
              private _http: HttpClient) { 
    this.token = _user_service.getToken();
    this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', this.token);
    this.url = global.serverUrl + 'associate';
  }

  GetInformations(params_id: string):Observable<any>{
    return this._http.get(`${this.url}/dependents-informations/${params_id}`, {headers: this.headers});
  }
  
  AddDependent(params: DependentsInformations):Observable<any>{
    return this._http.post(`${this.url}/dependents-informations/add`, params, {headers: this.headers});
  }

  DeleteDependent(associate_id:string, params_id: string): Observable<any>{
    return this._http.delete(`${this.url}/dependents-informations/${associate_id}/${params_id}`, {headers: this.headers});
  }
}
