import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Associate } from 'src/app/models/associate';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { AssociateService } from 'src/app/services/server/associate.service';

@Component({
  selector: 'app-details-associate',
  templateUrl: './details-associate.component.html',
  styleUrls: ['./details-associate.component.css'],
  providers: [MessageService, AssociateService]
})
export class DetailsAssociateComponent implements OnInit {

  public associate_id!:string;
  associate: Associate | undefined;
  birth_date: Date | undefined;

  public menu_items: MenuItem[];
  public activeItem: MenuItem;
  constructor(private _associate_service: AssociateService,
              private _activated_route: ActivatedRoute,
              private _message_service: MessageService) {
    this.menu_items = [
      {label: 'Datos personales', icon: 'pi pi-fw pi-user', routerLink: ['personal-informations']},
      {label: 'Datos ubicación', icon: 'pi pi-fw pi-map-marker', routerLink: ['location-informations']},
      {label:'Actividad economica', icon: 'pi pi-fw pi-briefcase', routerLink:['economic-activity']},
      {label: 'Informacion empresa', icon: 'pi pi-fw pi-building', routerLink:['job-informations']},
      {label: 'Datos conyuge', icon: 'pi pi-fw pi-users', routerLink:['conyuge-informations']},
      {label: 'Referencias', icon: 'pi pi-fw pi-id-card', routerLink:['references-informations']},
      {label: 'Beneficiarios', icon: 'pi pi-fw pi-cog', routerLink:['dependents-informations']},
      {label: 'Informacion financiera', icon: 'pi pi-fw pi-cog', routerLink:['financial-informations']},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
  ];
  this.activeItem = this.menu_items[2];
  }

  ngOnInit(): void {
    this._activated_route.params.subscribe({
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
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar obtener los parametros de navegacion. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._associate_service.GetData(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.associate = response.associate;
        } else{
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar obtener el asociado. Comuniquese con soporte'));
      }
    });
  }
}
