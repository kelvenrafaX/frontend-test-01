import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from 'src/app/models/widget';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html'
})
export class EditWidgetComponent {

  constructor(public dialogRef: MatDialogRef<EditWidgetComponent>,
    @Inject(MAT_DIALOG_DATA) public widget: Widget) { }

}
