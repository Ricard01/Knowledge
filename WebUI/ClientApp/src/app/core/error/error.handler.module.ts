import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global.error.handler';
import { ErrorInterceptor } from './error.interceptor';



@NgModule({
  declarations: [],
  providers: [
    {// processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true

    }

  ],
  imports: [
    CommonModule
  ]
})
export class ErrorHandlerModule { }
