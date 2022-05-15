import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Associate } from 'src/app/models/associate';

@Component({
  selector: 'app-details-associate',
  templateUrl: './details-associate.component.html',
  styleUrls: ['./details-associate.component.css'],
  providers: [MessageService]
})
export class DetailsAssociateComponent implements OnInit {

  associate: Associate | undefined;
  birth_date: Date | undefined;

  public menu_items: MenuItem[];

  constructor() {
    this.menu_items = [
      {label: 'Datos personales', icon: 'pi pi-fw pi-user', routerLink: ['personal-informations']},
      {label: 'Datos ubicación', icon: 'pi pi-fw pi-map-marker', routerLink: ['location-informations']},
      {label:'Actividad economica', icon: 'pi pi-fw pi-briefcase', routerLink:['economic-activity']},
      {label: 'Informacion empresa', icon: 'pi pi-fw pi-building', routerLink:['job_informations']},
      {label: 'Datos conyuge', icon: 'pi pi-fw pi-users'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
  ];
  }

  ngOnInit(): void {
    
  }

  get_parameters(parameters:any){
    this.associate = parameters.params_associate;
    this.birth_date = parameters.params_birth_date;
  }
}
