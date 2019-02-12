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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  chartCallback(chart): void { }

  getWidget(): void {
    this.widgetService.getWidget(this.route.snapshot.params['id'])
    .subscribe( widget => {
      this.widget = widget;
      console.log(this.widget);
      this.chartOptions.series[0].data = [];
      widget.values.map( item => {
        this.chartOptions.series[0].data.push( parseInt(item.value.toString(), 0) );
      });

      this.updateFlag = true;
    });
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

  openAddWidget(): void {
    const dialogRef = this.dialog.open(AddWidgetComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.addWidget(result);
      }
    });
  }

  openEditWidget(): void {
    const dialogRef = this.dialog.open(EditWidgetComponent, {
      data: this.widget
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editWidget(result);
    });
  }

  openDeleteWidget(): void {
    const dialogRef = this.dialog.open(DeleteWidgetComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWidget(this.widget.id);
      }
    });
  }
}

