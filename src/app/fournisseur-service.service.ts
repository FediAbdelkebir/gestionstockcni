import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import {Fournisseur} from './fournisseur';
import { map } from 'rxjs/operators';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class FournisseurServiceService {
  
private fournisseurUrl:String;
  constructor(private http:HttpClient) {
    this.fournisseurUrl="http://127.0.0.1:8081/";
   }
  public createfournisseur(fournisseur:Fournisseur){
    console.log(fournisseur);
    return this.http.post<Fournisseur>(this.fournisseurUrl+"dashboard/ajouterfournisseur",fournisseur)
  }
  public findAll(): Observable<any> {
    var CodeStruct;
    CodeStruct=sessionStorage.getItem('StructureUser')
    return this.http.get(this.fournisseurUrl+"dashboard/findallproviders/"+CodeStruct,httpOptions)
  }
  delete(item){
    
    return this.http.post('http://localhost:8081/fournisseur/delete/'+item,httpOptions).pipe(
      map(
        userData => {
          console.log('deleted with id= '+item);
          
        }
      )
  
    );
    
  }
  update(idf,nomf,addressf,numf){
    nomf
    addressf
    numf
    idf
     return this.http.post('http://localhost:8081/dashboard/fournisseur/'+idf+'/'+nomf+'/'+addressf+'/'+numf,httpOptions).pipe(
        map(
          userData => {

          }
        )
  
      );
  }
}
