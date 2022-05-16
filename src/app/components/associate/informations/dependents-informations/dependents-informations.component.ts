import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DependentsInformations } from 'src/app/models/informations/dependents-informations';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { DependentsInformationsService } from 'src/app/services/server/informations/dependents-informations.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-dependents-informations',
  templateUrl: './dependents-informations.component.html',
  styleUrls: ['./dependents-informations.component.css'],
  providers: [DependentsInformationsService, UtilitiesService, MessageService, ConfirmationService]
})
export class DependentsInformationsComponent implements OnInit {

  private associate_id!:string;
  public  list_dependents:any;
  public  dependent_information: DependentsInformations;
  public  list_types_identities: any;

  constructor(private _message_service: MessageService,
              private _utilities_service: UtilitiesService,
              private _dependents_informations_service: DependentsInformationsService,
              private _activated_route: ActivatedRoute,
              private _confirmation_service: ConfirmationService) { 
                this.dependent_information = new DependentsInformations();
              }

  ngOnInit(): void {
    this.GetTypesIdentities();
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        if(params){
          const id = params['id'];
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudieron obtener los parametros de navegacion o no existe un ID'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar obtener los parametros de navegacion. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._dependents_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_dependents = response.data;
        } else {
          this.list_dependents = response.data;
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar obtener los beneficiarios. Comuniquese con soporte'));
      }
    });
  }

  OnSubmit(){
    this.dependent_information.associate_id = this.associate_id;
    this._dependents_informations_service.AddDependent(this.dependent_information).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
        if(response.status && response.status === response_standars.success){
          this.GetInformations();
          this.NewDependent();
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar registrar el nuevo beneficiario. Comuniquese con soporte'));
      }
    })
  }

  NewDependent(){
    this.dependent_information = new DependentsInformations();
  }

  DeleteDependent(associate_id: string, params_id:string){
    this._dependents_informations_service.DeleteDependent(associate_id, params_id).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
        if(response.status && response.status === response_standars.success){
          this.GetInformations();
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de identificación'));
      }
    });
  }
  
  Confirm(event: Event, associate_id:string, params_id:string){
    this._confirmation_service.confirm({
      target: event.target!,
      message: 'Seguro desea eliminar este beneficiario?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.DeleteDependent(associate_id, params_id);
      }
    });
  }

  GetTypesIdentities(){
    this._utilities_service.GetTypesIdentities().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_identities = response.typesIdentities;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de identificación. Comuniquese con soporte'));
      }
    });
  }

}
