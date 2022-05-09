import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { response_standars } from '../services/indev-standards';
import { UserService } from '../services/server/user.service';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private _user_service: UserService,
              private route: Router){
    
  }
  canActivate() {
    const token = this._user_service.getToken();
    if(token && token.length > 0){
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
