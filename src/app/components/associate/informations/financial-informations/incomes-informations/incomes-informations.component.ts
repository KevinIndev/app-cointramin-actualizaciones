import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IncomesInformation } from 'src/app/models/informations/financial-informations/incomes-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { IncomesInformationsService } from 'src/app/services/server/informations/financial-informations/incomes-informations.service';

@Component({
  selector: 'app-incomes-informations',
  templateUrl: './incomes-informations.component.html',
  styleUrls: ['./incomes-informations.component.css'],
  providers: [IncomesInformationsService, MessageService, IncomesInformation]
})
export class IncomesInformationsComponent implements OnInit {

  private associate_id!:string;
  public  incomes_informations: IncomesInformation;
  public  total_incomes: number;
  constructor(private _activated_route: ActivatedRoute,
              private _message_service: MessageService,
              private _incomes_informations_service:IncomesInformationsService) { 
                this.incomes_informations = new IncomesInformation();
                this.total_incomes = this.incomes_informations.GetTotal();
              }

  ngOnInit(): void {
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        if(params){ 
          const id = params['id'];
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudieron obtener los parametros de navegación o no existe un ID.'));
        }
      }, 
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar obtener los parametros de navegación. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._incomes_informations_service.GetInformatios(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.incomes_informations.SetValues(response.data);
          this.total_incomes = this.incomes_informations.GetTotal();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar los ingresos. Comuniquese con soporte'));
      }
    })
  }

  OnSubmit(){
    this.incomes_informations.associate_id = this.associate_id;
    this._incomes_informations_service.AddInformations(this.incomes_informations).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
      },
      error: (err) =>{
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar guardar los ingresos mensuales. Comuniquese con soporte'));
      }
    })
  }

  UpdateTotal(params:IncomesInformation){
    try {
      const newIncomes = new IncomesInformation();
      newIncomes.SetValues(params);
      this.total_incomes = newIncomes.GetTotal();
    } catch (error) {
      this._message_service.add(map_message_service(response_standars.warning, 'No se puede calcular el total de los ingresos. Verifique su informacion'));
      this.total_incomes = 0;
    }
  }
}
