import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-widget',
  templateUrl: './delete-widget.component.html',
  styleUrls: ['./delete-widget.component.css']
})
export class DeleteWidgetComponent {

  constructor(public dialogRef: MatDialogRef<DeleteWidgetComponent>) { }

}
