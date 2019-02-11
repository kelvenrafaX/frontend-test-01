import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from '../widget';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.css']
})
export class AddWidgetComponent implements OnInit {

  widget: Widget;

  constructor(public dialogRef: MatDialogRef<AddWidgetComponent>) { }

  ngOnInit() {
    this.widget = { name: 'Name Widget', values: []};
    this.widget.values.push({ id: 0, value: 0});
  }

  addValueWidget() {
    this.widget.values.push({ id: this.widget.values.length, value: 0});
  }
}
