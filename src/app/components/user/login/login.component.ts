import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/server/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, MessageService]
})
export class LoginComponent implements OnInit {

  public app_version = '1.0.3';
  
  public response_message: [] | undefined;
  public login_params = {
    username: undefined,
    password: undefined,
    gettoken: true
  }
  
  constructor(private _user_service: UserService,
              private _message_service: MessageService) { }

  ngOnInit(): void {
  }

  public login(){
    this._user_service.Login(this.login_params).subscribe({
      next: (response) => {
        console.log(response);
        if(response.status && response.status === 'SUCCESS'){
          console.log(response.token);
        } else {
          this._message_service.add({severity:'success',summary: 'Sistema cointramin', detail: response.message});
        }
      },
      error: (err) => {
        const message = err.error.message?err.error.message: 'Error en el servidor. Sin status';
        console.log(">>ERROR EN EL SERVIODR");
        console.log(err);
        this._message_service.add({severity:'error',summary: 'Sistema cointramin', detail: message});
      }
    });
  }

}
