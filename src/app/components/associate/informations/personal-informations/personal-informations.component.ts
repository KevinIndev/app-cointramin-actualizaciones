import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Associate } from 'src/app/models/associate';
import { PersonalInformations } from 'src/app/models/informations/personal-informations';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { AssociateService } from 'src/app/services/server/associate.service';
import { PersonalInformationsService } from 'src/app/services/server/informations/personal-informations.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';


@Component({
  selector: 'app-personal-informations',
  templateUrl: './personal-informations.component.html',
  styleUrls: ['./personal-informations.component.css'],
  providers: [AssociateService, UtilitiesService, MessageService]
})
export class PersonalInformationsComponent implements OnInit {

  @Output() send_parameters = new EventEmitter<any>();

  private associate_id:string;
  public associate!: Associate;
  public list_departments:any;
  public list_locations_expedition: any;
  public list_locations_birth: any;
  public list_types_identities:any;
  public list_civil_status: any;
  public list_ethnic_groups:any;
  public list_education_levels:any;
  public list_types_profession:any;
  public list_strata:any;

  public personal_informations: PersonalInformations;

  constructor(private _associate_service: AssociateService,
              private _personal_informations_service: PersonalInformationsService,
              private _utilities_service: UtilitiesService,
              private _message_service: MessageService,
              private _activate_route: ActivatedRoute) {
                this.associate_id = this._activate_route.snapshot.params['id'];
                this.personal_informations = Object();
              }

  ngOnInit(): void {
    this.GetAssociate();
    this.LoadUtilities();
  }

  onSubmit(){
    this._associate_service.UpdateData(this.associate_id, this.associate).subscribe({
      next:(response) => {
        if(response.status && response.status === response_standars.success){
          this._personal_informations_service.AddInformations(this.personal_informations).subscribe({
            next:(response) => {
              this._message_service.add(map_message_service(response.status, response.message));
            },
            error: (error) => {
              MapErrorConsole(error);
              this._message_service.add(map_message_service(response_standars.error, 'Error en el sercidor al procesar los datos personales.'));
            }
          })
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (error) => {
        MapErrorConsole(error);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al procesar la informacio basica del asociado. Comuniquese con soporte'));
      }
    })
  }

  LoadUtilities(){
    this.GetDepartments();
    this.GetTypesIdentities();
    this.GetCivilStatus();
    this.GetEthnicGroups();
    this.GetEducationLevels();
    this.GetTypesProfession();
    this.GetListStrata();
  }

  private GetAssociate(){
    this._associate_service.GetData(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.associate = response.associate;
          this.MapParameters();
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar el asociado.'));
      }
    }); 
  }

  private GetInformations(){
    this._personal_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.personal_informations = response.data as PersonalInformations;
          this.MapParameters();
          //Validamos lista de ciudades
          this.GetLocations(this.personal_informations.d_expedition_department, 'locations_expedition');
          this.GetLocations(this.personal_informations.department_birth, 'locations_birth');
          
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al consultar los datos personales'));
      }
    });
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

  public GetLocations(code_department:string, options:string){
    this._utilities_service.GetLocationsByDepartment(code_department).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          switch (options) {
            case 'locations_expedition':
                this.list_locations_expedition = response.data;
              break;
            case 'locations_birth':
                this.list_locations_birth = response.data;
              break;
          }
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service('ERROR', 'Error en el servidor. Comuniquese con soporte'));
      }
    });
  }

  private GetTypesIdentities(){
    this._utilities_service.GetTypesIdentities().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_identities = response.typesIdentities;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.mesaje));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service('ERROR', 'Error en el servidor. Comuniquese con soporte'));
      }
    });  
  }

  private GetCivilStatus(){
    this._utilities_service.GetCivilStatus().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_civil_status = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidos al intentar cargar los estados civiles. Comuniqese con soporte'));
      }
    });
  }

  private GetListStrata(){
    this._utilities_service.GetTypesStratas().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_strata = response.data
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el serviodr al intetar carga los estratos, Comuniquese con soporte'))
      }
    })
  }

  private GetEthnicGroups(){
    this._utilities_service.GetEthnicGroups().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_ethnic_groups = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error,'Error en el servidor al intentar cargar los grupos ethnicos. Comuniquese con soporte'));
      }
    });
  }

  private GetEducationLevels(){
    this._utilities_service.GetEducationLevels().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_education_levels = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los niveles educativos.'));
      }
    })
  }

  private GetTypesProfession(){
    this._utilities_service.GetTypesProfessions().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_profession = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los tipos de profesiones. Comuniquese con soporte'));
      }
    });
  }

  public MapParameters(){
    const parameters = {
      params_associate: this.associate,
      params_birth_date: this.personal_informations.birth_date
    }
    this.send_parameters.emit(parameters);
  }

}
