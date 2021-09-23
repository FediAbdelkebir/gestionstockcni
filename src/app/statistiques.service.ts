import { Injectable } from '@angular/core';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(private http: HttpClient,private router:Router) { }

  public StatnbrBCE(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/nbrBCE/"+CodeStruct,httpOptions)
  }

  public StatnbrBCI(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/nbrBCI/"+CodeStruct,httpOptions)
  }
  public StatnbrArticle(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/StatnbrArticle/"+CodeStruct,httpOptions)
  }
  public Statnbrcustomer(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer/"+CodeStruct)
  }
  public StatnbrRole(): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/StatnbrRole",httpOptions)
  }
  public Statnbrcustomer_SuperAdmin(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer_SuperAdmin/"+CodeStruct,httpOptions)
  } 
  public StatnbrStructure(): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/StatnbrStructure",httpOptions)
  }
  public Statnbrcustomer_Admin(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer_Admin/"+CodeStruct,httpOptions)
  }
  public Statnbrcustomer_RFournisseurn(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer_RFournisseurn/"+CodeStruct,httpOptions)
  }
  public Statnbrcustomer_AFournisseur(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer_AFournisseur/"+CodeStruct,httpOptions)
  }
  public Statnbrcustomer_RMagasin(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer_RMagasin/"+CodeStruct,httpOptions)
  }
  public Statnbrcustomer_AMagasinAdmin(CodeStruct): Observable<any>{
    return this.http.get("http://localhost:8081/Stat/Statnbrcustomer_AMagasinAdmin/"+CodeStruct,httpOptions)
  }
  
}
