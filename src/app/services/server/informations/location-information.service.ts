import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationInformation } from 'src/app/models/informations/location-information';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class LocationInformationService {

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

  GetInformations(params_id: string):Observable<any>{
    return this._http.get(`${this.url}/location-informations/${params_id}`, {headers: this.headers});
  }
  Add(params: LocationInformation):Observable<any>{
    return this._http.post(`${this.url}/location-informations/add`, params, {headers:this.headers});
  }
}
