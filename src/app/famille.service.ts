import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  constructor(private http:HttpClient) { }
  public findAll(): Observable<any>{
    return this.http.get("http://127.0.0.1:8081/dashboard/findallfamilles",httpOptions)
  }
}
