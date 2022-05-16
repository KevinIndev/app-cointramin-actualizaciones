import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReferenceInformation } from 'src/app/models/informations/reference-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { ReferencesInformationsService } from 'src/app/services/server/informations/references-informations.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-references-informations',
  templateUrl: './references-informations.component.html',
  styleUrls: ['./references-informations.component.css'],
  providers: [ReferencesInformationsService, UtilitiesService, MessageService, ConfirmationService]
})
export class ReferencesInformationsComponent implements OnInit {

  private associate_id!:string;
  public reference_information: ReferenceInformation;
  public list_references_informations!: ReferenceInformation[];
  public list_locations: any;
  public list_departments: any;
  public list_types_references:any;

  constructor(private _references_informations_service: ReferencesInformationsService,
              private _utilities_service: UtilitiesService,
              private _activated_route: ActivatedRoute,
              private _message_service: MessageService,
              private confirmationService: ConfirmationService) { 
    this.reference_information = new ReferenceInformation();
  }

  ngOnInit(): void {
    this.LoadUtilities();
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        if(params){
          const id = params['id'];
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudieron obtener los parametros de navegacion o no existe un ID.'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al obtener los parametros de navegación. Comuniquese con soporte'));
      }
    })
  }

  public GetInformations(){
    this._references_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_references_informations = response.data;
        } else {
          this.list_references_informations = response.data;
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al consultar las referencias. Comuniquese con soporte'));
      }
    })
  }

  OnSubmit(){
    this.reference_information.associate_id = this.associate_id;
    this._references_informations_service.AddReference(this.reference_information).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add({key:'onModal', severity:'success', summary: 'Sistema InDev Application', detail: response.message});
          this.GetInformations();
          this.newReference();
        } else {
          this._message_service.add({key:'onModal', severity:'warn', summary: 'Sistema InDev Application', detail: response.message});
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add({key:'onModal', severity:'error', summary: 'Sistema InDev Application', detail: 'Error en el servidor al agregar la referencia. Comuniquese con soporte'});
      }
    })
  }

  public newReference(){
    this.reference_information = new ReferenceInformation();
    this.list_locations = [];
  }

  private DeleteReference(reference_id:string, associate_id:string){
    this._references_informations_service.DeleteReference(reference_id, associate_id).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
        if(response.status && response.status === response_standars.success){
          this.GetInformations();
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar eliminar la referencia. Comuniquese con soporte'));
      }
    })
  }

  Confirm(event: Event, reference_id:string, associate_id:string) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Seguro desea eliminar esta referencia?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.DeleteReference(reference_id, associate_id);
        }
    });
}

  LoadUtilities(){
    this.GetTypesReferences();
    this.GetListDepartments();
  }

  GetTypesReferences(){
    this._utilities_service.GetTypesReference().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_references = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los tipos de referencia. Comuniquese con soporte'));
      }
    });
  }
  
  GetListDepartments(){
    this._utilities_service.GetDepartments().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_departments = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los departamentos. Comuniquese con soporte'));
      }
    });
  }

  GetListLocations(code_department: string){
    this._utilities_service.GetLocationsByDepartment(code_department).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_locations = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los municipios. Comuniquese con soporte'));
      }
    });
  }

}
