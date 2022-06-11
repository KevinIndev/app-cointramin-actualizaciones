import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/server/utilities.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css'],
  providers: [UtilitiesService, MessageService]
})
export class ReportsHomeComponent implements OnInit {

  private configCSV = { 
    fieldSeparator: ';',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: false, 
    showTitle: false,
    title: '',
    useBom: false,
    noDownload: false,
    headers: [],
    useHeader: false,
    nullToEmptyString: true,
  };
  constructor(private _utilities_service: UtilitiesService,
              private _message_service: MessageService) { }

  ngOnInit(): void {
  }

  DownloadUpdateData(){
    this._utilities_service.GetMainData().subscribe({
      next: (response) => {
        if(response.status && response.status === 'SUCCESS'){
          try {
            new AngularCsv(response.dataset, 'Datos principales', this.configCSV);
            this._message_service.add({severity:'success', summary: 'Mensaje del sistema', detail:'Datos principales generados correctamente.'});
          } catch (error) {
            this._message_service.add({severity:'error', summary:'Mensaje del sistema', detail:'Error al generar el archivo .CSV'});
          }
        }else {
          this._message_service.add({severity:'warn', summary:'Mensaje del sistema', detail: 'Problemas al obtener los datos principales del servidor.'})
        }
      }, 
      error: (err) => {
        console.log('>> ERROR EN EL SERVIDOR')
        console.log(err as any);
        this._message_service.add({severity:'error', summary:'Mensaje del sistema', detail:'Error al exportar los datos principales del sistema.'});
      }
    });

    //DATOS COMPLEMENTARIOS
    this._utilities_service.GetSupplementsData().subscribe({
      next: (response) => {
        if(response.status && response.status === 'SUCCESS'){
          try {
            new AngularCsv(response.dataset, 'Datos complementarios', this.configCSV);
            this._message_service.add({severity:'success', summary: 'Mensaje del sistema', detail:'Datos complementarios generados correctamente.'});
          } catch (error) {
            this._message_service.add({severity:'error', summary:'Mensaje del sistema', detail:'Error al generar el archivo .CSV'});
          }
        }else {
          this._message_service.add({severity:'warn', summary:'Mensaje del sistema', detail: 'Problemas al obtener los datos complementarios del servidor.'})
        }
      }, 
      error: (err) => {
        console.log('>> ERROR EN EL SERVIDOR')
        console.log(err as any);
        this._message_service.add({severity:'error', summary:'Mensaje del sistema', detail:'Error al exportar los datos complementarios del sistema.'});
      }
    });

    this._utilities_service.GetLocationData().subscribe({
      next: (response) => {
        if(response.status && response.status === 'SUCCESS'){
          try {
            new AngularCsv(response.dataset, 'Datos ubicacion', this.configCSV);
            this._message_service.add({severity:'success', summary: 'Mensaje del sistema', detail:'Datos de ubicacion generados correctamente.'});
          } catch (error) {
            this._message_service.add({severity:'error', summary:'Mensaje del sistema', detail:'Error al generar el archivo .CSV'});
          }
        }else {
          this._message_service.add({severity:'warn', summary:'Mensaje del sistema', detail: 'Problemas al obtener los datos de ubicacion del servidor.'})
        }
      }, 
      error: (err) => {
        console.log('>> ERROR EN EL SERVIDOR')
        console.log(err as any);
        this._message_service.add({severity:'error', summary:'Mensaje del sistema', detail:'Error al exportar los datos de ubicacion del sistema.'});
      }
    });
  }
}
