import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000'

  getUrl(): Observable<any>{
    return this.http.get(this.url);
  }
}
