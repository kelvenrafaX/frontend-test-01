import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-widget',
  templateUrl: './delete-widget.component.html'
})
export class DeleteWidgetComponent {

  constructor(public dialogRef: MatDialogRef<DeleteWidgetComponent>) { }

}
