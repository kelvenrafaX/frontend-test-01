import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
