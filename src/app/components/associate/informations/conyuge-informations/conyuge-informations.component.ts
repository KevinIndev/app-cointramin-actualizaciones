import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConyugeInformation } from 'src/app/models/informations/conyuge-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { ConyugeInformationsService } from 'src/app/services/server/informations/conyuge-informations.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-conyuge-informations',
  templateUrl: './conyuge-informations.component.html',
  styleUrls: ['./conyuge-informations.component.css'],
  providers: [UtilitiesService, MessageService]
})
export class ConyugeInformationsComponent implements OnInit {

  private associate_id!: string;
  public conyuge_information: ConyugeInformation;
  public list_departments: any;
  public list_expedition_locations: any;
  public list_locations:any;
  public list_types_contract: any;
  public list_types_identities:any;
  public list_types_occupations:any;

  constructor(private _utilities_service: UtilitiesService,
              private _message_service: MessageService,
              private _activated_route: ActivatedRoute,
              private _conyuge_informations_service: ConyugeInformationsService) { 
    this.conyuge_information = new ConyugeInformation();
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
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar obtener los parametros de navegacion. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._conyuge_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.conyuge_information = response.data;

          //Load Cities
          this.GetLocations(this.conyuge_information.d_expedition_department, 'expedition_locations');
          this.GetLocations(this.conyuge_information.department, 'locations');
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },  
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar la información del conyuge. Comuniquese con soporte'));
      }
    })
  }

  OnSubmit(){
    this.conyuge_information.associate_id = this.associate_id;
    this._conyuge_informations_service.AddInformations(this.conyuge_information).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar guardar los cambios. Comuniquese con soporte'));
      }
    })
  }

  LoadUtilities(){
    this.GetTypesIdentites();
    this.GetDepartments();
    this.GetTypesOccupations();
    this.GetTypesContract();
  }

  GetTypesIdentites(){
    this._utilities_service.GetTypesIdentities().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_identities = response.typesIdentities;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de identificación. Comuiniquese con soporte'));
      }
    })
  }

  GetDepartments(){
    this._utilities_service.GetDepartments().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_departments = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los departamentos. Comuniquese con soporte'));
      }
    });
  }

  GetLocations(code_department:string, option:string){
    this._utilities_service.GetLocationsByDepartment(code_department).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          switch (option) {
            case 'locations':
                this.list_locations = response.data;
              break;
            case 'expedition_locations':
                this.list_expedition_locations = response.data;
              break;
            default:
              break;
          }
        } else {  
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, `Error en el servidor al cargar las ciudades para ${option}. Comuniquese con soporte`));
      }
    });
  }

  GetTypesOccupations(){
    this._utilities_service.GetTypesOccupations().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_occupations = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de ocupación. Comuniquese con soporte'));
      }
    });
  }

  GetTypesContract(){
    this._utilities_service.GetTypesContract().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_contract = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de contrato. Comuniquese con soporte'));
      }
    });
  }
}
