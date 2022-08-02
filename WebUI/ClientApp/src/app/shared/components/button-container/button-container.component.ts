import { Component, Input } from '@angular/core';
import { IButtonContainerSettings } from '../../models/button-container';

@Component({
  selector: 'button-container',
  template: `
        <button type="button" mat-raised-button color="primary" style="width:85%;"(click)="settings.fn()"> {{settings.text}}
          <mat-icon color="accent" class="ms-2 me-1">{{settings.icon}}
          </mat-icon>
        </button>
  `
})
export class ButtonContainerComponent  { 
  @Input() settings : IButtonContainerSettings;

}



