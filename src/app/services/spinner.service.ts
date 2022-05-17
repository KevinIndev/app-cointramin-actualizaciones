import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private ngxService: NgxSpinnerService) { }
  show(){
    this.ngxService.show();
  }
  hiden(){
    this.ngxService.hide();
  }
}
