import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { map_message_service, response_standars } from 'src/app/services/indev-standards';
import { UserService } from 'src/app/services/server/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [UserService, MessageService]
})
export class NavBarComponent implements OnInit {

  
  public username: string | undefined;
  public user_role!: string;
  constructor(private _user_service: UserService,
    private _message_service: MessageService) { }

  ngOnInit(): void {
    this.GetData();
  }

  public GetData(){
    this._user_service.GetData().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.username = `${response.data.name} ${response.data.surnames}`;
          this.user_role = response.data.role
        } else {
          this._message_service.add(map_message_service(response.status,response.message));
        }
      },
      error: (err) => {
        const message = err.error.status?err.error.message: 'Error en el servidor no identificado. Comuniquese con soporte';
        console.log('>>ERROR SERVER');
        console.log(err as any);
        this._message_service.add(map_message_service('ERROR', message));
      }
    })
  }

  public IconUser(){
    const icon = this.username?.charAt(0);
    return icon;
  }

}
