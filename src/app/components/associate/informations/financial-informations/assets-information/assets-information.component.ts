import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AssetsInformation } from 'src/app/models/informations/financial-informations/assets-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { AssetsInformationsService } from 'src/app/services/server/informations/financial-informations/assets-informations.service';

@Component({
  selector: 'app-assets-information',
  templateUrl: './assets-information.component.html',
  styleUrls: ['./assets-information.component.css'],
  providers: [AssetsInformationsService, MessageService, ConfirmationService]
})
export class AssetsInformationComponent implements OnInit {

  public associate_id!: string;
  public assets_information: AssetsInformation;
  public list_assets_informations: any;
  public message_list!: string | undefined;

  constructor(private _assets_informations_service: AssetsInformationsService,
              private _message_service: MessageService,
              private _activated_route: ActivatedRoute,
              private _confirm_service: ConfirmationService) {
                this.assets_information = new AssetsInformation();
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
        this._message_service.add(map_message_service(response_standars.error, 'Error al obtener los parametros de navegación. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._assets_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_assets_informations = response.data;
          this.message_list = undefined;
        } else {
          this.message_list = response.message;
        }
      },
      error: (err) => {
        this.message_list = 'No se pudieron cargar';
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar los activos. Comuniquese con soporte'));
      }
    });
  }

  OnSubmit(){
    this.assets_information.associate_id = this.associate_id;
    this._assets_informations_service.AddInformations(this.assets_information).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add({key: 'toast_modal', severity: 'success', summary: 'Mensaje del sistema', detail: response.message});
          this.GetInformations();
          this.assets_information = new AssetsInformation();
        } else {
          this._message_service.add({key: 'toast_modal', severity: 'warn', summary: 'Mensaje del sistema', detail: response.message});
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add({key: 'toast_modal', severity: 'error', summary: 'Mensaje del sistema', detail: 'Error en el servidor al intentar registrar el activo. Comuniquese con soporte'});
      }
    });
  }

  DeleteAssets(params: AssetsInformation){
    this._assets_informations_service.DeleteAssets(params.associate_id, params.type_asset).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add(map_message_service(response.status, response.message));
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar eliminar el item. Comuniquese con soporte'));
      }
    });
  }

  confirm_delete(event: Event, params:AssetsInformation) {
    this._confirm_service.confirm({
        target: event.target!,
        message: 'Seguro que desea eliminar este item?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.DeleteAssets(params);
        }
    });
  }
}
