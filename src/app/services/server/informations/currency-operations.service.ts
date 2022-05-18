import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyOperations } from 'src/app/models/informations/currency-operations';
import { global } from '../global';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyOperationsService {

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
  
  public GetInformations(params_id:string):Observable<any>{
    return this._http.get(`${this.url}/currency-operations/${params_id}`, {headers: this.headers});
  }

  public AddInformations(params:CurrencyOperations):Observable<any>{
    return this._http.post(`${this.url}/currency-operations/add`, params, {headers: this.headers});
  }

  public DeleteOperation(associate_id:string, params_id:number):Observable<any>{
    return this._http.delete(`${this.url}/currency-operations/remove/${associate_id}/${params_id}`, {headers: this.headers});
  }
}
