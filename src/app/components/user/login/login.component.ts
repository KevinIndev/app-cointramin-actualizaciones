import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/server/user.service';
import {response_standars, map_message_service} from 'src/app/services/indev-standards';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, MessageService]
})
export class LoginComponent implements OnInit {

  public app_version = '1.0.3';
  
  public isLoading = false;
  public response_message: [] | undefined;
  public login_params = {
    username: undefined,
    password: undefined,
    gettoken: true
  }
  
  constructor(private _user_service: UserService,
              private _message_service: MessageService,
              private route: Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.isLoading = true;
    this._user_service.Login(this.login_params).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._user_service.setToken(response.token);
          this.route.navigate(['/master/']);
        } else {
          this._message_service.add(map_message_service(response.status as string,response.message as string));
        }
      },
      error: (err) => {
        const message = err.error.message?err.error.message: 'Error en el servidor. Sin status';
        console.log(">>ERROR EN EL SERVIODR");
        console.log(err);
        this._message_service.add(map_message_service(response_standars.error, message));
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
