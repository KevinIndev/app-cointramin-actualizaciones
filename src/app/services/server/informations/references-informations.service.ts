import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceInformation } from 'src/app/models/informations/reference-information';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ReferencesInformationsService {

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
    return this._http.get(`${this.url}/references-informations/${params_id}`, {headers:this.headers});
  }

  public AddReference(params:ReferenceInformation):Observable<any>{
    return this._http.post(`${this.url}/references-informations/add`, params, {headers: this.headers});
  }

  public DeleteReference(reference_id:string,associate_id:string):Observable<any>{
    return this._http.delete(`${this.url}/references-informations/${reference_id}/${associate_id}`, {headers: this.headers});
  }
}
