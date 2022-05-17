import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/server/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private token: string | string[];
  constructor(private _user_service: UserService,
              private _route: Router){
    this.token = _user_service.getToken();
  }
  canActivate(){
    if(this.token && this.token.length > 0){
      this._route.navigate(['/master']);
      return false;
    } else {
      return true;
    }
  }
  
}
