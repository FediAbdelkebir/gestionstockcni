import { Injectable } from '@angular/core';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { customer } from './customer';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service'
import { Router } from '@angular/router';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  id:any;
  Roleuser;
  item;
  ListRoles:[];
  private customersUrl: string;
  constructor(private http: HttpClient,private router:Router,private auth:AuthService) {
   this.customersUrl = 'http://127.0.0.1:8081/';
   }
 customers
   public findAll(): Observable<any> {
    var CodeStruct;
    CodeStruct=sessionStorage.getItem('StructureUser')
    return this.http.get(this.customersUrl+"findall/"+CodeStruct,httpOptions)
  }
  public GetRole(email){
    email=sessionStorage.getItem("email");
    return this.http.get("http://127.0.0.1:8081/findR/"+email,httpOptions).subscribe((data) => {
      
      /*list mt3 array list t3 roles lel redirection
      console.log(data);
      this.ListRoles.concat(data);
      sessionStorage.setItem("ListRoles",data);*/
      sessionStorage.setItem("Roleuser",data);
      return data;
  });
  }
  public GetStructure(email){
    email=sessionStorage.getItem("email");
    return this.http.get("http://127.0.0.1:8081/findS/"+email,httpOptions).subscribe((data) => {
      sessionStorage.setItem("StructureUser",data);
      return data;
  });
  }
  public GetStructureAr(codeSt){
    return this.http.get("http://127.0.0.1:8081/findSAR/"+codeSt,httpOptions).subscribe((data) => {
      sessionStorage.setItem("StructureAr",data);
      return data;
  });
  }
  public findid(email){
    return this.http.get<number>("http://127.0.0.1:8081/account/id/"+email,httpOptions);
    
  }
  public GetStructurelib(codeSt){

    return this.http.get("http://127.0.0.1:8081/findSLIB/"+codeSt,httpOptions).subscribe((data) => {
      sessionStorage.setItem("Structurelib",data);
      return data;
  });
  }
    public findID(codeSt){
    return this.http.get("http://127.0.0.1:8081/findID/"+codeSt,httpOptions).subscribe((data) => {
      sessionStorage.setItem("StructureID",data);
      return data;
  });
  }
  public createCustomer(customer:customer){
    console.log("hello")
    console.log(customer)
    return this.http.post<customer>('http://127.0.0.1:8081/register',customer)
    
  }
  public save(customer: customer) {
  return this.http.post<customer>(this.customersUrl, customer);
  }
  identification(email){
    email
    return this.http.get<BigInteger>('http://localhost:8081/account/'+email,httpOptions).pipe(
          map(
            userData => {
              console.log(userData);
          
            return userData;
            }
          )
    
        );
    }

    update(id,email,lastname,name,password,tel){
       return this.http.post('http://localhost:8081/account/'+id+'/'+email+'/'+lastname+'/'+name+'/'+password+'/'+tel,httpOptions).pipe(
          map(
            userData => {
              sessionStorage.setItem("email",email);
              sessionStorage.setItem("name",name);
              sessionStorage.setItem("lastname",lastname);
            }
          )
    
        );
    }
    Delete(id){
      
      return this.http.post('http://localhost:8081/account/delete/'+id,httpOptions).pipe(
        map(
          userData => {
            /*this.auth.logOut();*/
            
          }
        )
    
      );
      
    }
}
