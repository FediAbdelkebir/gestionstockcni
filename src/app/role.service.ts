import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class RoleService {
RoleUrl:String;
  constructor(private http:HttpClient) {
    this.RoleUrl="http://127.0.0.1:8081/";
   }
  public findAll(): Observable<any> {
    return this.http.get(this.RoleUrl+"dashboard/roles",httpOptions)
  }
  public findAllCustomerRoles(): Observable<any> {
    return this.http.get(this.RoleUrl+"findAllCustomerRoles",httpOptions)
  }
}
