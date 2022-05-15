import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobInformation } from 'src/app/models/informations/job-information';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class JobInformationsService {

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

  GetInformations(params_id:string):Observable<any>{
    return this._http.get(`${this.url}/job-informations/${params_id}`, {headers: this.headers});
  }

  AddInformations(params:JobInformation):Observable<any>{
    return this._http.post(`${this.url}/job-informations/add`, params, {headers: this.headers});
  }

}
