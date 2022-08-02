import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable()
// https://www.tektutorialshub.com/angular/angular-http-error-handling/
// https://medium.com/calyx/global-error-handling-with-angular-and-ngrx-d895f7df2895
// https://stackoverflow.com/questions/46433953/how-to-cancel-current-request-in-interceptor-angular-4
// https://stackoverflow.com/questions/54765185/global-errorhandler-is-not-working-after-implementing-catcherror-in-ngrx-effect?noredirect=1&lq=1

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request).pipe(
            catchError(error => {

                let handledError: boolean = false;

                if (error instanceof HttpErrorResponse) {

                    // Forbidden
                    if (error.status == 403) {
                        handledError = true;
                        this.router.navigate(['error/404', { error: error.status }], { skipLocationChange: true }); // dont wanna give tip about wath happend

                        console.log("%c Error Interceptor ", 'background: indigo;  border-radius: 5px; font-weight: bold', error);
                        console.error(error.message) // Delete in Produccition                               
                    }
                }


                if (handledError) {

                    return EMPTY // Cut the interceptor chain

                } else {

                    return throwError(() => error);
                }

            }));

    }


}


