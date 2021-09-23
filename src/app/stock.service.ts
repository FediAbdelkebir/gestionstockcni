import { Injectable } from '@angular/core';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stock } from './stock';
let httpOptions = { responseType: 'text' };

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient,private router:Router) { 
   
  }
  public createStock(Stock:Stock){
    console.log("Stock")
    console.log(Stock)
    return this.http.post<Stock>('http://127.0.0.1:8081/AjouterStock',Stock)
    
  }
  public QTE_COURANTE(idarticle,code){
    return this.http.get<number>('http://127.0.0.1:8081/dashboard/QTE_COURANTE/'+idarticle+'/'+code)
  }
  public QuantiteINITIAl(idarticle,code){
    return this.http.get<number>('http://127.0.0.1:8081/dashboard/QTE_INITIAl/'+idarticle+'/'+code)
  }
}
