import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Widget } from '../../models/widget';
import { WidgetService } from 'src/app/providers/widget.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  providers: [ WidgetService ]
})
export class WidgetComponent implements OnInit {

  widget: Widget;

  Highcharts: any;
  chartConstructor: string;
  chartOptions: {
    title: string,
    series: [{ data: number[] }]
  };
  updateFlag: boolean;
  oneToOneFlag: boolean;
  runOutsideAngular: boolean;

  constructor( private widgetService: WidgetService, private dialog: MatDialog,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private route: ActivatedRoute,
    private router: Router ) {
      iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/add.svg'));
      iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/menu.svg'));

      this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd) {
            this.getWidget();
          }
      });
  }

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.chartConstructor = 'chart';
    this.chartOptions = {
      title: '',
      series: [{
        data: []
      }]
    };
    this.updateFlag = false;
    this.oneToOneFlag = true;
    this.runOutsideAngular = false;
    this.getWidget();
  }

  chartCallback(chart): void { }

  getWidget(): void {
    this.widgetService.getWidget(this.route.snapshot.params['id'])
    .subscribe( widget => {
      this.widget = widget;
      this.chartOptions.series[0].data = [];
      widget.values.map( item => {
        this.chartOptions.series[0].data.push( parseInt(item.value.toString(), 0) );
      });

      this.updateFlag = true;
    });
  }

  openAddWidget(): void {
    const dialogRef = this.dialog.open(AddWidgetComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.addWidget(result);
    });
  }

  addWidget(widget: Widget): void {
    this.widgetService.addWidget(widget)
    .subscribe( response => {
      console.log(response);
    });
  }
}

