import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ExpensesInformation } from 'src/app/models/informations/financial-informations/expenses-information';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { ExpensesInformationsService } from 'src/app/services/server/informations/financial-informations/expenses-informations.service';

@Component({
  selector: 'app-expenses-informations',
  templateUrl: './expenses-informations.component.html',
  styleUrls: ['./expenses-informations.component.css']
})
export class ExpensesInformationsComponent implements OnInit {

  public associate_id!: string;
  public expenses_information: ExpensesInformation;
  public total_expenses: number;

  constructor(private _expenses_informations_service: ExpensesInformationsService,
              private _activated_route: ActivatedRoute,
              private _message_service: MessageService) { 
                this.expenses_information = new ExpensesInformation();
                this.total_expenses = this.expenses_information.GetTotal();
              }

  ngOnInit(): void {
    this._activated_route.parent?.params.subscribe({
      next: (params) => {
        if(params){
          const id = params['id'];
          this.associate_id = id;
          this.GetInformations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, 'No se pudieron obtener los parametros de navegacion ó no existe un ID.'));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error al intentar obtener los parametros de navegación. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._expenses_informations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.expenses_information = new ExpensesInformation();
          this.expenses_information.SetValue(response.data);
          this.total_expenses = this.expenses_information.GetTotal();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar los gastos mensuales. Comuniquese con soporte'));
      }
    });
  }

  OnSubmit(){
    this.expenses_information.associate_id = this.associate_id;
    this._expenses_informations_service.AddInformations(this.expenses_information).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar guardar los egresos mensuales. Comuniquese con soporte'));
      }
    })
  }
  
  UpdateTotal(params:ExpensesInformation){
    this.total_expenses = params.GetTotal();
  }

}
