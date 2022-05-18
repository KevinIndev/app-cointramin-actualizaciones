import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.css'],
  providers: [SpinnerService]
})
export class SpinnerLoaderComponent implements OnInit {
  lo = this._spinner_service.isLoading;
  constructor(public _spinner_service: SpinnerService) { }

  ngOnInit(): void {
    
  }

}
