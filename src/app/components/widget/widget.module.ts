import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
         MatListModule, MatInputModule, MatCardModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { WidgetComponent } from './widget.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { DeleteWidgetComponent } from './delete-widget/delete-widget.component';

@NgModule({
  declarations: [
    WidgetComponent,
    AddWidgetComponent,
    EditWidgetComponent,
    DeleteWidgetComponent
  ],
  entryComponents: [WidgetComponent, AddWidgetComponent, EditWidgetComponent, DeleteWidgetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    MatListModule,
    HighchartsChartModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule
  ],
  exports: [
    WidgetComponent, AddWidgetComponent, EditWidgetComponent, DeleteWidgetComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class WidgetModule { }
