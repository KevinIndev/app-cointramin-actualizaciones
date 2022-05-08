import { Component, OnInit } from '@angular/core';

//module primeng
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.css']
})
export class NavSideComponent implements OnInit {

  public app_name = 'Indev Sistem';
  constructor() { }

  ngOnInit(): void {
    
  }
  

}
