import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isLoading = false;
  constructor() { }

  show(){
    this.isLoading = true;
  }

  hiden(){
    this.isLoading = false;
  }
}
