import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PassivesInformation } from 'src/app/models/informations/financial-informations/passives-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { PassivesInformationsService } from 'src/app/services/server/informations/financial-informations/passives-informations.service';

@Component({
  selector: 'app-passives-informations',
  templateUrl: './passives-informations.component.html',
  styleUrls: ['./passives-informations.component.css'],
  providers: [PassivesInformationsService, MessageService, ConfirmationService]
})
export class PassivesInformationsComponent implements OnInit {

  private associate_id!: string;
  public  passives_information: PassivesInformation;
  public  list_passives_informations: any;
  public  message_list: string | undefined;

  constructor(private _passives_informations_service: PassivesInformationsService,
              private _message_service: MessageService,
              private _activated_route: ActivatedRoute,
              private _confirm_service: ConfirmationService) { 
                this.passives_information = new PassivesInformation();
              }

  ngOnInit(): void {
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        if(params){
          const id = params['id'];
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudieron obtener los parametros de navegación ó no existe un ID.'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar obtener los parametros de navegación. Comuniquese con soporte'));
      }
    });
  }

  GetInformations(){
    this._passives_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_passives_informations = response.data;
          this.message_list = undefined;
        } else {
          this.message_list = response.message;
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        this.message_list = 'Error en el servidor...'
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar la descripción de los pasivos. Comuniquese con soporte'));
      }
    });
  }

  OnSubmit(){
    this.passives_information.associate_id = this.associate_id;
    this._passives_informations_service.AddInformations(this.passives_information).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add({key: 'toast_modal', severity: 'success', summary:'Mensaje del sistema', detail: response.message});
          this.GetInformations();
          this.passives_information = new PassivesInformation();
        } else {
          this._message_service.add({key: 'toast_modal', severity: 'warn', summary:'Mensaje del sistema', detail: response.message});
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add({key:'toast_modal', severity:'error', summary: 'Mensaje del sistema', detail: 'Error en el servidor al intentar registrar la informacion del pasivos. Comuniquese con soporte'});
      }
    });
  }

  DeletePasive(params:PassivesInformation){
    this._passives_informations_service.DeletePassive(params.associate_id, params.debt).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add(map_message_service(response_standars.success, response.message));
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar eliminar la información del pasivo. Comuniquese con soporte'));
      }
    });
  }

  confirm_delete(event: Event, params:PassivesInformation) {
    this._confirm_service.confirm({
        target: event.target!,
        message: 'Seguro que desea eliminar este item?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.DeletePasive(params);
        }
    });
  }

}
