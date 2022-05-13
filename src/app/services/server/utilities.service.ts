import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {global} from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public url!: string | string[];
  private token: string | string[];
  private headers: HttpHeaders;
  constructor(private _user_service: UserService,
              private _http: HttpClient) { 
    this.token = _user_service.getToken();
    this.url = global.serverUrl;
    this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', this.token);
  }

  GetDepartments():Observable<any>{
    return this._http.get(`${this.url}geolocations/departments/list`, {headers: this.headers});
  }

  GetLocationsByDepartment(code_department:string):Observable<any>{
    return this._http.get(`${this.url}geolocations/locations/list/department/${code_department}`,{headers: this.headers});
  }

  GetTypesIdentities():Observable<any>{
    return this._http.get(`${this.url}typesIdentities/list`, {headers: this.headers});
  }

  GetCivilStatus():Observable<any>{
    return this._http.get(`${this.url}civilStatus/list`, {headers: this.headers});
  }

  GetEthnicGroups():Observable<any>{
    return this._http.get(`${this.url}ethnicGroups/list`, {headers:this.headers});
  }

  GetEducationLevels():Observable<any>{
    return this._http.get(`${this.url}educationLevels/list`, {headers:this.headers});
  }

  GetTypesProfessions():Observable<any>{
    return this._http.get(`${this.url}typesProfession/list`, {headers: this.headers});
  }

  GetTypesStratas():Observable<any>{
    return this._http.get(`${this.url}typesStrata/list`, {headers: this.headers});
  }

  GetTypesHousing():Observable<any>{
    return this._http.get(`${this.url}typesHousing/list`, {headers: this.headers});
  }

  GetTypesOccupations():Observable<any>{
    return this._http.get(`${this.url}typesOccupation/list`, {headers: this.headers});
  }
}
