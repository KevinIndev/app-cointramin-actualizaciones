import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EconomicActivity } from 'src/app/models/informations/economic-activity';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { EconomicActivityService } from 'src/app/services/server/informations/economic-activity.service';
import { UtilitiesService } from 'src/app/services/server/utilities.service';

@Component({
  selector: 'app-economic-activity',
  templateUrl: './economic-activity.component.html',
  styleUrls: ['./economic-activity.component.css'],
  providers: [EconomicActivityService, UtilitiesService, MessageService]
})
export class EconomicActivityComponent implements OnInit {

  public associate_id!:string;
  public economic_activity: EconomicActivity;
  public list_types_occupations:any;

  constructor(private _economci_activity_service: EconomicActivityService,
              private _utilities_service: UtilitiesService,
              private _message_service: MessageService,
              private _activated_route: ActivatedRoute) { 
      this.economic_activity = Object();
      this.GetTypesOccupations();
  }

  ngOnInit(): void {
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        const id = params['id'];
        if(id){
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'Error al capturar los parametros de navegacion o no existe un ID.'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al obtener los parametros de navegación. Comuniquese con soporte'));
      }
    });
  }

  GetInformations(){
    this._economci_activity_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.economic_activity = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar cargar los datos de actividad economica. Comuniquese con soporte'));
      }
    });
  }

  OnSubmit(){
    this.economic_activity.associate_id = this.associate_id;
    this._economci_activity_service.Add(this.economic_activity).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al inentar guardar la actividad economica'));
      }
    })
  }
  
  GetTypesOccupations(){
    this._utilities_service.GetTypesOccupations().subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_types_occupations = response.data;
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar cargar los tipos de ocupaciones. Comuniquese con soporte'));
      }
    })
  }

}
