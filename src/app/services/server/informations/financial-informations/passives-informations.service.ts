import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassivesInformation } from 'src/app/models/informations/financial-informations/passives-information';
import { global } from '../../global';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root'
})
export class PassivesInformationsService {

  private url: string | string[];
  private token: string | string[];
  private headers: HttpHeaders;

  constructor(private _http: HttpClient,
              private _user_service: UserService) {
                this.token = _user_service.getToken();
                this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                                .set('Authorization', this.token);
                this.url = global.serverUrl + 'associate/financial-informations';
               }

  public GetInformations(params_id: string):Observable<any>{
    return this._http.get(`${this.url}/passives/${params_id}`, {headers: this.headers});
  }

  public AddInformations(params: PassivesInformation):Observable<any>{
    return this._http.post(`${this.url}/passives/add`, params, {headers: this.headers});
  }

  public DeletePassive(associate_id: string, params_id:string):Observable<any>{
    return this._http.delete(`${this.url}/passives/remove/${associate_id}/${params_id}`, {headers: this.headers});
  }

}
