import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Widget } from './widget';

const WIDGETMOCK: Widget[] = [{
  name: 'Widget 1',
  values: [{ id: 0, value: 1 },
           { id: 1, value: 2 },
           { id: 2, value: 3 }]
}];

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  widgets: Widget[] = WIDGETMOCK;

  Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartOptions = {
    series: [{
      data: [1, 2, 3]
    }]
  };
  chartCallback = function (chart) { };
  updateFlag = false;
  oneToOneFlag = true;
  runOutsideAngular = false;

  constructor( private dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {
      iconRegistry.addSvgIcon(
        'plus',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/add.svg'));
  }

  ngOnInit() { }

  openAddWidget(): void {
    const dialogRef = this.dialog.open(AddWidgetComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.addWidget(result);
    });
  }

  addWidget(widget: Widget) {
    this.widgets.push(widget);
  }
}

