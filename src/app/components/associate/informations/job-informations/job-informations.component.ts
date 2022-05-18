import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JobInformation } from 'src/app/models/informations/job-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { JobInformationsService } from 'src/app/services/server/informations/job-informations.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-job-informations',
  templateUrl: './job-informations.component.html',
  styleUrls: ['./job-informations.component.css'],
  providers: [JobInformationsService, MessageService, UtilitiesService]
})
export class JobInformationsComponent implements OnInit {

  private associate_id!: string;
  public  job_information!: JobInformation;
  public  list_types_contract: any;
  public  list_departments:any;
  public  list_locations:any;
  public  list_types_jobs: any;
  public  list_headquarters: any;
  public  list_types_business:any;
  public list_types_roles:any;

  constructor(private _job_information_service: JobInformationsService,
              private _message_service: MessageService,
              private _utilities_service: UtilitiesService,
              private _activated_route: ActivatedRoute) { 
                this.job_information = Object();
              }

  ngOnInit(): void {
    this.LoadUtilities();
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        const id = params['id'];
        if(id){
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudieron obtener los parametros de navegacion o existe un ID'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar obtener los paramteros de navegacion. Comuniquese con soporte'));
      }
    });
  }

  GetInformations(){
    this._job_information_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){ 
          this.job_information = response.data;

          //Cargamos las ciudades
          this.GetLocations(this.job_information.department);
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar la informacion de la empresa. Comuniquese con soporte'));
      }
    })
  }

  OnSubmit(){
    this.job_information.associate_id = this.associate_id;
    this._job_information_service.AddInformations(this.job_information).subscribe({
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
    this.GetBusiness();
    this.GetListDepartments();
    this.GetTypesContract();
    this.GetTypesJobs();
    this.GetHeadquarters();
    this.GetTypesRoles();
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
        this._message_service.add(map_message_service(response_standars.error,'Error en el servidor al cargar los tipo de contratos. Comuniquese con soporte'));
      }
    });
  }

  GetListDepartments(){
    this._utilities_service.GetDepartments().subscribe({
      next: (response) =>{
        if(response.status && response.status === response_standars.success){
          this.list_departments = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar obtener los departamentos. Comuniquese con soporte'));
      }
    })
  }

  GetLocations(code_department: string){
    this._utilities_service.GetLocationsByDepartment(code_department).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_locations = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los municipios. Comuniquese con soporte.'));
      }
    })
  }

  GetTypesJobs(){
    this._utilities_service.GetTypesJob().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_jobs = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de cargo. Comuniquese con soporte'));
      }
    });
  }

  GetHeadquarters(){
    this._utilities_service.GetHeadquarters().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_headquarters = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) =>{
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de sedes. Comuniquese con soporte'));
      }
    });
  }

  GetTypesRoles(){
    this._utilities_service.GetTypesRole().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_roles = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de roles. Comuniquese con soporte'));
      }
    })
  }

  GetBusiness(){
    this._utilities_service.GetTypesBusiness().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_business = response.data;
        } else {
          this._message_service.add(map_message_service(response.status, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al cargar los tipos de empresa. Comuniquese con soporte'));
      }
    });
  }
}
