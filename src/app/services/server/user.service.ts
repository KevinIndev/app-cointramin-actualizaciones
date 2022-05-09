import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';
import * as CryptoJS from 'crypto-js';
import { response_standars } from '../indev-standards';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private key_login = 'INDEV_09052022_'

  public url: string | string[] | undefined;
  public headers: HttpHeaders | undefined;
  constructor(private _http: HttpClient) {
    this.url = global.serverUrl + 'users'
    this.headers = new HttpHeaders().set('Content-type', 'application/json');
   }

  public Login(params:{}):Observable<any>{
    return this._http.post(`${this.url}/login`, params, {headers: this.headers});
  }

  public GetData():Observable<any>{
    const token = this.getToken();
    this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(`${this.url}/data`,{headers: this.headers});
  }

  public setToken(token: string){
    localStorage.setItem('token', CryptoJS.AES.encrypt(token,this.key_login).toString());
  }

  public getToken(){
    try {
      const token = CryptoJS.AES.decrypt(localStorage.getItem('token') as string, this.key_login).toString(CryptoJS.enc.Utf8);
      return token;
    } catch (error) {
      return '';
    }
  }

  /**
   * Metodo que permite validar si el token enviado existe, es valido y consistente.
   * @param {string} token Cadena derivada del usuario para procesos de autenticacion.
   */
  public validateToken(token: string | string[]):boolean{
    this.headers = new HttpHeaders().set('Content-type', 'application/json')
                                    .set('Authorization', token);
    
    let status_validation = false;
    this._http.get(`${this.url}/validate`, {headers: this.headers}).subscribe({
      next: (response: any) => {
        if(response.status && response.status === response_standars.success){
          status_validation = response.data;
        }
      }
    });
    return status_validation;
  }

  public Logout(){
    localStorage.clear();
    return true;
  }
}
