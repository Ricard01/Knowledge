import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ApiAuthorizationModule, // LoginMenu
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
