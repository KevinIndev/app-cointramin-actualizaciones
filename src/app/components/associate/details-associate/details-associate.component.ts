import { Component, OnInit } from '@angular/core';
import { Associate } from 'src/app/models/associate';

@Component({
  selector: 'app-details-associate',
  templateUrl: './details-associate.component.html',
  styleUrls: ['./details-associate.component.css']
})
export class DetailsAssociateComponent implements OnInit {

  associate: Associate | undefined;
  birth_date: Date | undefined;


  constructor() { 
              }

  ngOnInit(): void {
    
  }

  get_parameters(parameters:any){
    this.associate = parameters.params_associate;
    this.birth_date = parameters.params_birth_date;
  }
}
