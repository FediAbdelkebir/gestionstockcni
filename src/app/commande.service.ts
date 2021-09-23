import { Injectable } from '@angular/core';
import { Commande } from './commande';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BCE } from './bce';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  UpdateINVOICE_BCE(idarticle,quantite,code) {
    return this.http.post("http://127.0.0.1:8081/dashboard/UpdateINVOICE_BCE"+"/"+idarticle+"/"+quantite+"/"+code,httpOptions);
  }
  UpdateINVOICE_BCI(idarticle,quantite,code) {
    return this.http.post("http://127.0.0.1:8081/dashboard/UpdateINVOICE_BCI"+"/"+idarticle+"/"+quantite+"/"+code,httpOptions);
  }
  public NameArticle(id) {
    return this.http.get("http://127.0.0.1:8081/dashboard/NameArticle/"+id, httpOptions);
  }
  commandesUrl;
  constructor(private http: HttpClient,private router:Router) { 
    this.commandesUrl== 'http://127.0.0.1:8081/';
  }
  public saveBCI(commande: Commande) {
    return this.http.post<Commande>("http://127.0.0.1:8081/dashboard/ajouterBCI", commande);
    }
    public saveBCE(commande: BCE) {
      return this.http.post<BCE>('http://127.0.0.1:8081/dashboard/ajouterBCE', commande);
      }  
      public findAllBCI(): Observable<any>{
        var CodeStruct;
        CodeStruct=sessionStorage.getItem('StructureUser')
        return this.http.get("http://127.0.0.1:8081/dashboard/findallBCI/"+CodeStruct, httpOptions)
      }
      public findAllBCE(): Observable<any>{
        var CodeStruct;
        CodeStruct=sessionStorage.getItem('StructureUser')
        return this.http.get("http://127.0.0.1:8081/dashboard/findallBCE/"+CodeStruct, httpOptions)
      }
      public INVOICE(CodeBCE): Observable<any>{
        return this.http.get("http://127.0.0.1:8081/dashboard/INVOICE/"+CodeBCE, httpOptions)
      }
      public INVOICEBCI(CodeBCI): Observable<any>{
        return this.http.get("http://127.0.0.1:8081/dashboard/INVOICEBCI/"+CodeBCI, httpOptions)
      }
      deleteBCI(item){
    
        return this.http.post('http://localhost:8081/BCI/delete/'+item,httpOptions).pipe(
          map(
            userData => {
              console.log('deleted with id= '+item);
              
            }
          )
      
        );
        
      }
      deleteBCE(item){
    
        return this.http.post('http://localhost:8081/BCE/delete/'+item,httpOptions).pipe(
          map(
            userData => {
              console.log('deleted with id= '+item);
              
            }
          )
      
        );
        
      }
      ApproveBCI(idc,etat){
       idc;
       etat;
         return this.http.post('http://localhost:8081/dashboard/BCI/Approve/'+idc+'/'+etat,httpOptions).pipe(
            map(
              userData => {
    
              }
            )
      
          );
      }
      DeclineBCI(idc,etat){
        idc;
        etat;
          return this.http.post('http://localhost:8081/dashboard/BCI/Decline/'+idc+'/'+etat,httpOptions).pipe(
             map(
               userData => {
     
               }
             )
       
           );
       }
      ApproveBCE(idc,etat){
        idc;
        etat;
          return this.http.post('http://localhost:8081/dashboard/BCE/Approve/'+idc+'/'+etat,httpOptions).pipe(
             map(
               userData => {
     
               }
             )
       
           );
       }
       DeclineBCE(idc,etat){
        idc;
        etat;
          return this.http.post('http://localhost:8081/dashboard/BCE/Decline/'+idc+'/'+etat,httpOptions).pipe(
             map(
               userData => {
     
               }
             )
       
           );
       }
      public testbci(quantite,id_article,idbci){
        console.log("weslt")
          return this.http.post('http://localhost:8081/dashboard/BCIA/'+quantite+'/'+id_article+'/'+idbci+'/',httpOptions).pipe(
             map(
               userData => {
                console.log("weslt hne zeda")
               }
             )  
       
           );
       }
       public testbce(quantite,prix,id_article,idbce){
        console.log("weslt bce")
          return this.http.post('http://127.0.0.1:8081/BCEA/'+quantite+'/'+prix+'/'+id_article+'/'+idbce,httpOptions).pipe(
             map(
               userData => {
                console.log("weslt hne zeda")
               }
             )  
       
           );
       }
}
