import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CurrencyOperations } from 'src/app/models/informations/currency-operations';
import { MapErrorConsole, map_message_service, response_standars } from 'src/app/services/indev-standards';
import { CurrencyOperationsService } from 'src/app/services/server/informations/currency-operations.service';

@Component({
  selector: 'app-currency-operations',
  templateUrl: './currency-operations.component.html',
  styleUrls: ['./currency-operations.component.css'],
  providers: [CurrencyOperationsService, MessageService, ConfirmationService]
})
export class CurrencyOperationsComponent implements OnInit {
  
  public associate_id!: string;
  public currency_operation: CurrencyOperations;
  public list_currency_operations: any;
  public message_list: string | undefined;

  constructor(private _currency_operations_service: CurrencyOperationsService,
              private _message_service: MessageService,
              private _activated_route: ActivatedRoute,
              private _confirm_service: ConfirmationService) { 
                this.currency_operation = new CurrencyOperations();
              }

  ngOnInit(): void {
    this._activated_route.parent?.params.subscribe({
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
        this._message_service.add(map_message_service(response_standars.error, 'Error al obtener los paramtros de navegación. Comuniquese con soporte'));
      }
    })
  }

  GetInformations(){
    this._currency_operations_service.GetInformations(this.associate_id).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.list_currency_operations = response.data;
          this.message_list = undefined;
        } else {
          this.message_list = response.message;
        }
      },
      error: (err) => {
        this.message_list = 'Error en el servidor...'
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar consultar las operaciónes. Comuniquese con soporte'));
      }
    });
  }

  OnSubmit(){
    this.currency_operation.associate_id = this.associate_id;
    this._currency_operations_service.AddInformations(this.currency_operation).subscribe({
      next: (response) => {
        if(response.status && response.status === response_standars.success){
          this.GetInformations();
          this._message_service.add(map_message_service(response_standars.success, response.message));
          this.currency_operation = new CurrencyOperations();
        } else {
          this._message_service.add(map_message_service(response_standars.warning, response.message));
        }
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar registrar la operacion. Comuniquese con soporte'));
      }
    });
  }

  DeleteItem(params:CurrencyOperations){
    this._currency_operations_service.DeleteOperation(this.associate_id, params.id).subscribe({
      next: (response) => {
        this._message_service.add(map_message_service(response.status, response.message));
        this.GetInformations();
      },
      error: (err) => {
        MapErrorConsole(err);
        this._message_service.add(map_message_service(response_standars.error, 'Error en el servidor al intentar eliminar la operación. Comuniquese con soporte'));
      }
    });
  }

  confirm_delete(event: Event, params:CurrencyOperations) {
    this._confirm_service.confirm({
        target: event.target!,
        message: 'Seguro que desea eliminar este item?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.DeleteItem(params);
        }
    });
  }

}
