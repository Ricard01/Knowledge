import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {  }


  success(message: string) {
    return this.snackBar.open(message, undefined, { panelClass: ['snackbar-success'], duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
  }

  error(message: any) {
    return this.snackBar.open(message, undefined, { panelClass: ['snackbar-error'], duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' });
  }

}
