import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import {Magasin} from './magasin'
import { map } from 'rxjs/operators';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class MagasinServiceService {

  private magasinUrl:String;
    constructor(private http:HttpClient) {
      this.magasinUrl="http://127.0.0.1:8081/";
     }
    public createmagasin(magasin:Magasin){
      console.log(magasin);
      return this.http.post<Magasin>(this.magasinUrl+"dashboard/ajoutermagasin",magasin)
    }
    public findAll(): Observable<any> {
      return this.http.get(this.magasinUrl+"dashboard/findallmagasins",httpOptions)
    }
    Delete(id){
      return this.http.post('http://localhost:8081/magasin/delete/'+id,httpOptions).pipe(
        map(
          userData => {
            /*this.auth.logOut();*/
            
          }
        )
    
      );
      
    }
    update(idm,magasin,addressm,numm){
       return this.http.post('http://localhost:8081/dashboard/magasin/'+idm+'/'+magasin+'/'+addressm+'/'+numm,httpOptions).pipe(
          map(
            userData => {
  
            }
          )
    
        );
    }
}
