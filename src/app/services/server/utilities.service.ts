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

  GetTypesContract():Observable<any>{
    return this._http.get(`${this.url}typesContract/list`, {headers: this.headers});
  }

  GetTypesJob():Observable<any>{
    return this._http.get(`${this.url}typesJob/list`, {headers: this.headers});
  }

  GetHeadquarters():Observable<any>{
    return this._http.get(`${this.url}headquarters/list`, {headers: this.headers});
  }

  GetTypesRole():Observable<any>{
    return this._http.get(`${this.url}typesRole/list`, {headers: this.headers});
  }

  GetTypesReference():Observable<any>{
    return this._http.get(`${this.url}typesReference/list`, {headers: this.headers});
  }

  GetTypesBusiness():Observable<any>{
    return this._http.get(`${this.url}/business/list`, {headers: this.headers});
  }

  GetSupplementsData():Observable<any>{
    return this._http.get(`${this.url}/exportData/DatosComplementarios`, {headers: this.headers});
  }

  GetMainData():Observable<any>{
    return this._http.get(`${this.url}/exportData/DatosPrincipales`, {headers: this.headers});
  }

  GetLocationData(paramsDate: Date):Observable<any>{
    const params = {
      paramsDate
    }
    return this._http.post(`${this.url}/exportData/DatosUbicacion`, params, {headers: this.headers});
  }

  GetDateReport():Observable<any>{
    return this._http.get(`${this.url}/exportData/dateReport`, {headers: this.headers});
  }
}
