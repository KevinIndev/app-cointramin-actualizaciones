import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate } from 'src/app/models/associate';
import { global } from './global';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  private url: string | string[] | undefined;
  private token: string | string[];
  private headers: HttpHeaders | undefined;

  constructor(private _http: HttpClient,
              private _user_service: UserService) { 
    this.url = global.serverUrl + 'associates';
    this.token = _user_service.getToken();
    this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.token)
  }

  public GetList(): Observable<any>{
    return this._http.get(`${this.url}/list`, {headers: this.headers});
  }

  public GetData(params_id:string): Observable<any>{
    return this._http.get(`${this.url}/list/${params_id}`, {headers:this.headers});
  }

  public UpdateData(params_id:string, params_data: Associate):Observable<any>{
    return this._http.put(`${this.url}/list/${params_id}`, params_data, {headers: this.headers});
  }
}
