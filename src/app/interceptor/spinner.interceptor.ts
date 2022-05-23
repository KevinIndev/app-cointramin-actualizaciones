import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable, timeout } from "rxjs";
import { SpinnerService } from "../services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{
    constructor(private _spinner_service: SpinnerService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._spinner_service.show();
        return next.handle(req).pipe(
            finalize(() => {
                setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this._spinner_service.hiden();
                  }, 200);
            })
        )
    }

}