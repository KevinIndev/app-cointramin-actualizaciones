import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-associate',
  templateUrl: './list-associate.component.html',
  styleUrls: ['./list-associate.component.css']
})
export class ListAssociateComponent implements OnInit {

  public list_associates = [{names: 'KEVIN E', number_identity: '1003944634', surname_1: 'MARTINEZ', surname_2: 'CAMPO', status: 'ACTIVO', updated_data: '22/08/2022'}];
  public params_search: string | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
