import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { SousStructure } from './sous-structure';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class SousstructureService {

  createsoustructure(soustructure) {
    console.log(soustructure);
    return this.http.post<SousStructure>(this.SousStructureUrl+"dashboard/AjouterSousStructure",soustructure)
  }
  SousStructureUrl:String;
  constructor(private http:HttpClient) { 
    this.SousStructureUrl="http://127.0.0.1:8081/";
  }
  public findAll(CodeStruct): Observable<any> {
    return this.http.get(this.SousStructureUrl+"dashboard/SousStructure/"+CodeStruct)
  }
  update(nom,newname,CodeStruct){
    return this.http.post('http://localhost:8081/dashboard/Sousstructure/'+nom+'/'+newname+'/'+CodeStruct,httpOptions).pipe(
       map(
         userData => {

         }
       )
 
     );
 }
 Delete(nom,CodeStruct){
    
  return this.http.post('http://localhost:8081/SousStructure/delete/'+nom+'/'+CodeStruct,httpOptions).pipe(
    map(
      userData => {
        
        
      }
    )

  );
  
}
  
}
