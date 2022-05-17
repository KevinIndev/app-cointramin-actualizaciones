import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocationInformation } from 'src/app/models/informations/location-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { LocationInformationService } from 'src/app/services/server/informations/location-information.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-location-informations',
  templateUrl: './location-informations.component.html',
  styleUrls: ['./location-informations.component.css'],
  providers: [UtilitiesService, MessageService]
})
export class LocationInformationsComponent implements OnInit {

  private associate_id!: string;
  public location_information: LocationInformation;

  public list_departments:any;
  public list_locations:any;
  public list_locations_work:any;
  public list_types_housing:any;

  constructor(private _location_information_service: LocationInformationService,
              private _utilities_service: UtilitiesService,
              private _message_service: MessageService,
              private _activate_route: ActivatedRoute) { 
              this.location_information = new LocationInformation();
              this.LoadUtilities();
    }

  ngOnInit(): void {
    this._activate_route.parent?.params.subscribe({
      next: (params) => {
        const id = params['id'];
        if(id){
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudo obtener los parametros de navegacion o no existe un ID.'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Erro al obtener los parametros de navegacion. Comuniquese con soporte'));
      }
    })
  }

  LoadUtilities(){
    this.GetDepartments();
    this.GetTypesHousing();
  }

  private GetInformations(){
    this._location_information_service.GetInformations(this.associate_id).subscribe({
      next: (response) =>{
        if(response.status && response.status === response_standars.success){
          this.location_information = response.data;
          this.list_locations = this.GetLocations(this.location_information.department, 'locations');
          this.list_locations = this.GetLocations(this.location_information.department_work, 'locations_work');
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar los datos de ubicacion. Comuniquese con soporte'));
      }
    })
  }

  private GetDepartments(){
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
        this._message_service.add(map_message_service('ERROR', 'Error en el servidor. Comuniquese con soporte'));
      }
    });
  }

  public OnSubmit(){
    this.location_information.associate_id = this.associate_id;
    this._location_information_service.Add(this.location_information).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this._message_service.add(map_message_service(response_standars.success, response.message));
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar guardar los datos de ubicacion. Comuniquese con soporte'));
      }
    })
  }

  public GetTypesHousing(){
    this._utilities_service.GetTypesHousing().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_housing = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar obtener los tipo de vivienda. Comuniquese con soporte'));
      }
    })
  }

  GetLocations(code_department:string, options:string){
    this._utilities_service.GetLocationsByDepartment(code_department).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          switch (options) {
            case 'locations':
                this.list_locations = response.data;
              break;
            case 'locations_work':
                this.list_locations_work = response.data;
              break;
            default:
              break;
          }
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {

      }
    })
    switch (options) {
      case 'location':
          
        break;
      case 'location_work':

          break;
      default:
        break;
    }
  }
}
