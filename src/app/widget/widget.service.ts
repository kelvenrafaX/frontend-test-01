import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Widget } from './widget';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class WidgetService {

  url: any;

  constructor(private http: HttpClient) {
    this.url  = `http://localhost:3000/widgets`;
  }

  getWidget(id: number): Observable<Widget> {
    return this.http.get<Widget>(`${this.url}/${id}`);
  }

  getWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.url);
  }

  searchWidgets(name: string): Observable<Widget[]> {
    return this.http.get<Widget[]>(`${this.url}?name_like=${name}`);
  }

  addWidget(widget: Widget): Observable<Widget>  {
   return this.http
     .post<Widget>(`${this.url}`, widget, httpOptions);
 }
}
