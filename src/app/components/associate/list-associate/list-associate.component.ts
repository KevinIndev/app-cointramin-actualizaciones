import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Associate } from 'src/app/models/associate';
import { map_message_service, response_standars } from 'src/app/services/indev-standards';
import { AssociateService } from 'src/app/services/server/associate.service';


@Component({
  selector: 'app-list-associate',
  templateUrl: './list-associate.component.html',
  styleUrls: ['./list-associate.component.css'],
  providers: [AssociateService, MessageService]
})
export class ListAssociateComponent implements OnInit {

  public list_associates!: Associate[];
  public params_search: string | undefined;
  
  constructor(private _associate_service: AssociateService,
              private _message_service: MessageService) { }

  ngOnInit(): void {
    this.GetListAssociates();
  }

  private GetListAssociates(){
      this._associate_service.GetList().subscribe({
        next: (response) => {
          if(response.status && response.status === response_standars.success){
            this.list_associates = response.associates;
          } else {
            this._message_service.add(map_message_service(response.status, response.message));
          }
        },
        error: (err) => {
          const message = err.error.status?err.error.message: 'Error en el servidor no definido. Comuniquese con soporte';
          console.log('>> ERROR SERVER');
          console.log(err as any);
          this._message_service.add(map_message_service('ERROR', message));
        }
      });
  }
}
