import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})

// https://coditty.com/code/angular-material-display-multiple-snackbars-messages-in-sequence
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private zone: NgZone) { }

  handleError(error: any | Error | HttpErrorResponse) {

    const notifier = this.injector.get(SnackbarService);

    let errorMessage: any;

    if (error instanceof HttpErrorResponse) {

      console.log("%c ErrorHandler ", 'background: darkviolet;  border-radius: 5px; font-weight: bold');
      console.error(error.error);

      if (!navigator.onLine) {
        console.error('No Internet Connection');
      }

      switch (error.status) {

        case 400:

          errorMessage = error.error.errors;


          this.zone.run(() => {

            let timeout = 1500;


            Object.keys(errorMessage).forEach(function (key, index) {

              setTimeout(() => {
                notifier.error(errorMessage[key][0]);
              }, index * (timeout + 300))


            });

          });


          break;

        case 401:  //Unauthorized  ||   Not Token                   
          console.error(error);
          break;

        case 404: // not found 
          errorMessage = `Error Code: ${error.status}\nTitle: ${error.error.title}\nDetail: ${error.error.detail}\nType: ${error.error.type}`;
          notifier.error(errorMessage);

          break;
      }

    }


  }


}
