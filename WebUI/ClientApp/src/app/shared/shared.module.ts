import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';
import { TrimValueAccessorDirective } from './directives/trim.directive';
import { QuillTextEditorComponent } from './components/quill-text-editor/quill-text-editor.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ButtonContainerComponent } from './components/button-container/button-container.component';


@NgModule({
  declarations: [
    TrimValueAccessorDirective,
    QuillTextEditorComponent,
    ButtonContainerComponent,
    ModalContainerComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ModalModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        syntax: true,
      }
    }),      
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,   
    MatIconModule,
    MatCardModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonContainerComponent,
    QuillModule,
    TrimValueAccessorDirective,
    QuillTextEditorComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatListModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],


})
export class SharedModule { }
