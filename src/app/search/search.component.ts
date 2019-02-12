import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Widget } from '../widget/widget';
import { WidgetService } from '../widget/widget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ WidgetService ]
})
export class SearchComponent implements OnInit {

  @Output() eventRefresh = new EventEmitter();
  options: Widget[];
  name: string;

  constructor( public router: Router, private widgetService: WidgetService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/search.svg'));
  }

  ngOnInit() {
    this.name = '';
    this.searchWidgets();
  }

  searchWidgets() {
    console.log('Procurando');
    this.widgetService.searchWidgets(this.name)
      .subscribe( widgets => {
        this.options = widgets;
        console.log(widgets);
      });
  }
}
