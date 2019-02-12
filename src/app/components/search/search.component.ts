import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Widget } from '../../models/widget';
import { WidgetService } from 'src/app/providers/widget.service';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor( public router: Router, private widgetService: WidgetService,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/search.svg'));

    /* Observing some changes in the parameter 'id'
    of the route to perform a new search of the widget */
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.searchWidgets();
      }
    });
  }

  ngOnInit(): void {
    this.name = '';
    this.searchWidgets();
  }

  /* Search for widgets related to the name in the search bar */
  searchWidgets(): void {
    this.widgetService.searchWidgets(this.name)
    .subscribe( widgets => {
      this.options = widgets;
    });
  }
}
