import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Associate } from 'src/app/models/associate';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { AssociateService } from 'src/app/services/server/associate.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-list-associate',
  templateUrl: './list-associate.component.html',
  styleUrls: ['./list-associate.component.css'],
  providers: [AssociateService, MessageService]
})
export class ListAssociateComponent implements OnInit {

  public associate: Associate;
  public list_associates!: Associate[];
  public params_search: string | undefined;
  
  public list_types_identities:any;
  constructor(private _associate_service: AssociateService,
              private _message_service: MessageService,
              private _utitlities_service: UtilitiesService,
              private _router: Router) { 
                this.associate = new Associate();
              }

  ngOnInit(): void {
    this.LoadUtilities();
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

  SearchAssociate(event:any){
    if(event.keyCode == 13){
      const search = this.params_search?this.params_search.trim():undefined;
      if(search){
        this._associate_service.GetData(search).subscribe({
          next: (response) => {
            if(response.status && response.status === response_standars.success){
              try {
                this._router.navigate(['/master/associate/details/', response.associate.number_identity]);
              } catch (error) {
                MapErrorConsole(error);
                this._message_service.add(map_message_service(response_standars.error, 'No se pudo redirreccionar a los detalles. Comuniquese con soporte'));
              }
            } else {
              this._message_service.add(map_message_service(response_standars.warning, response.message));
            }
          },
          error: (err) => {
            MapErrorConsole(err);
            this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar el asociado. Comuniquese con soporte'));
          }
        });
      }
    }
  }

  OnSubmit(){
    this._associate_service.Add(this.associate).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add({key:'toast_modal', severity:'success', summary:'Mensaje del sistema', detail: response.message});
          this.associate = new Associate();
          this.GetListAssociates();
        } else {
          this._message_service.add({key:'toast_modal', severity:'warn', summary:'Mensaje del sistema', detail: response.message});
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add({key:'toast_modal', severity:'error', summary:'Mensaje del sistema', detail: 'Error en el servidor al intentar registrar el asociado. Comuniquese con soporte'});
      }
    })
  }

  LoadUtilities(){
    this._utitlities_service.GetTypesIdentities().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_identities = response.typesIdentities;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los tipo de indentificación. Comuniquese con soporte'));
      }
    })
  }
}
