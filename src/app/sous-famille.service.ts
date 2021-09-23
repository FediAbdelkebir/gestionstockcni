import { Injectable } from '@angular/core';
let httpOptions = { responseType: 'text' };
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class SousFamilleService {

  constructor(private http:HttpClient) { }
  public findAll(): Observable<any>{
    return this.http.get("http://127.0.0.1:8081/dashboard/findallsousfamilles")
  }
}
