import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/server/user.service';
import { environment } from 'src/environments/environment';
//module primeng


@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.css'],
  providers: [UserService]
})
export class NavSideComponent implements OnInit {

  public app_name = environment.APP_NAME;
  constructor(private _user_service: UserService) { }

  ngOnInit(): void {

  }
  
  OnLogout(){
    this._user_service.Logout();
    window.location.reload();
  }

}
