import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'modal-container',
  template: `
  <div class="modal-body">
    <h2 mat-dialog-title>Confirm Delete</h2>

    <ng-container *ngIf="!categoryName; else opt2">

        <p class="text-center">  Are you sure you want to delete the {{ module }} <br>
        <span class="text-danger font-weight-bold ">{{ name }} </span> </p>

    </ng-container>

    <ng-template #opt2>

        <p class="text-center">  Are you sure you want to delete the {{ module }} 
        <span class="text-danger font-weight-bold ">{{ name }} </span> from  <u>{{ categoryName }}</u> Category</p>

    </ng-template>
  </div>

  <div class="modal-footer">
      <!-- <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button> -->
      <button type="button" class="btn btn-danger" (click)="confirm()" >Yes</button>
      <button type="button" class="btn btn-primary" (click)="decline()" >No</button>
</div>
  `
})
export class ModalContainerComponent implements OnInit {

  module: string;
  name: string;
  categoryName?: string;

  @Output() event = new EventEmitter();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.event.emit();
    this.bsModalRef.hide();
  }

  decline(): void {

    this.bsModalRef.hide();
  }

}
