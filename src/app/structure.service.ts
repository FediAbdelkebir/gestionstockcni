import { Injectable } from '@angular/core';
import {Structure} from './structure';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private StructureUrl:String;
  constructor(private http:HttpClient) { 
    this.StructureUrl="http://127.0.0.1:8081/";
  }
  public createstructure(structure:Structure){
    console.log(structure);
    return this.http.post<Structure>(this.StructureUrl+"dashboard/ajouterstructure",structure)
  }
  public findAll(): Observable<any> {
    return this.http.get(this.StructureUrl+"dashboard/findallstructures")
  }
  public findAllcustomerstructure(): Observable<any> {
    return this.http.get(this.StructureUrl+"findAllcustomerstructure")
  }
  Delete(code){
    
    return this.http.post('http://localhost:8081/structure/delete/'+code,httpOptions).pipe(
      map(
        userData => {
          /*this.auth.logOut();*/
          
        }
      )
  
    );
    
  }
  update(code,lib_ar,lib_latin){
     return this.http.post('http://localhost:8081/dashboard/structure/'+code+'/'+lib_ar+'/'+lib_latin,httpOptions).pipe(
        map(
          userData => {

          }
        )
  
      );
  }

}
