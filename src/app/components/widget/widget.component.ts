import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Widget } from '../../models/widget';
import { WidgetService } from 'src/app/providers/widget.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { DeleteWidgetComponent } from './delete-widget/delete-widget.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  providers: [ WidgetService ]
})
export class WidgetComponent implements OnInit {

  widget: Widget;

  /* Chart Configuration */
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
    private router: Router, private snackBar: MatSnackBar ) {

      iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/add.svg'));
      iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/menu.svg'));

      /* Observing some changes in the parameter 'id'
      of the route to perform a new search of the widget */
      this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd) {
            this.getWidget();
          }
      });
  }

  ngOnInit(): void {
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

  /* Method to trigger a message to the user */
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /* Search for widget related to the param id in router */
  getWidget(): void {
    this.widgetService.getWidget(this.route.snapshot.params['id'])
    .subscribe( widget => {
      this.updateChart(widget);
    });
  }

  updateChart(widget: Widget): void {
    this.widget = widget;
    this.chartOptions.series[0].data = [];
    widget.values.map( item => {
      this.chartOptions.series[0].data.push( parseInt(item.value.toString(), 0) );
    });

    this.updateFlag = true;
  }

  addWidget(widget: Widget): void {
    this.widgetService.addWidget(widget)
    .subscribe( response => {
      this.openSnackBar('Widget created successfully!', 'OK');
      this.router.navigate([`/home/${response.id}`]);
    });
  }

  editWidget(widget: Widget): void {
    this.widgetService.editWidget(widget)
    .subscribe( response => {
      this.openSnackBar('Widget edited successfully!', 'OK');
      this.getWidget();
    });
  }

  deleteWidget(id: number): void {
    this.widgetService.deleteWidget(id)
    .subscribe( response => {
      this.openSnackBar('Widget deleted successfully!', 'OK');
      this.widgetService.getWidgets()
      .subscribe( widgets => {
        this.widget = widgets[0];
        this.router.navigate([`/home/${widgets[0].id}`]);
      });
    });
  }

  /* Opens the widget addition dialog and waits for the closure */
  openAddWidget(): void {
    const dialogRef = this.dialog.open(AddWidgetComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.addWidget(result);
      }
    });
  }

  /* Opens the widget editing dialog and waits for the closure */
  openEditWidget(): void {
    const dialogRef = this.dialog.open(EditWidgetComponent, {
      data: this.widget
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editWidget(result);
    });
  }

  /* Opens the widget deleting dialog and waits for the closure */
  openDeleteWidget(): void {
    const dialogRef = this.dialog.open(DeleteWidgetComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWidget(this.widget.id);
      }
    });
  }
}

