import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../models/log.interface';

@Injectable({
  providedIn: 'root'
})
export class LogDataService {
  
  private dataUrl = 'input-data/data.json'; 

  constructor(private http: HttpClient) { }

  getData(): Observable<Log[]> {
    return this.http.get<Log[]>(this.dataUrl); 
  }
}
