import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Widget } from '../../../models/widget';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html'
})
export class AddWidgetComponent implements OnInit {

  widget: Widget;

  constructor(public dialogRef: MatDialogRef<AddWidgetComponent>) { }

  ngOnInit(): void {
    this.widget = { name: 'Name Widget', values: []};
    this.widget.values.push({ id: 0, value: 0});
  }

  addValueWidget(): void {
    this.widget.values.push({ id: this.widget.values.length, value: 0});
  }
}
