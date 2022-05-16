import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomesInformation } from 'src/app/models/informations/financial-informations/incomes-information';
import { global } from '../../global';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesInformationsService {

  private url: string | string[];
  private token: string | string[];
  private headers: HttpHeaders;

  constructor(private _user_service:UserService,
              private _http: HttpClient) { 
                this.token = _user_service.getToken();
                this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                                .set('Authorization', this.token);
                this.url = global.serverUrl + 'associate/financial-informations';
              }
  
  public GetInformatios(params_id: string):Observable<any>{
    return this._http.get(`${this.url}/incomes/${params_id}`, {headers: this.headers});
  }

  public AddInformations(params: IncomesInformation): Observable<any>{
    return this._http.post(`${this.url}/incomes/add`, params, {headers: this.headers});
  }
}
