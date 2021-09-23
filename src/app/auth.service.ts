import { Injectable } from '@angular/core';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgZone} from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
let httpOptions = { responseType: 'text' };
/*
export class Customer {constructor(public status: string) { }
}*/
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn: boolean;
  Roleuser
  public redirectUrl: string;
  message:any;
  id:any;
  constructor(private  NgZone: NgZone,private httpClient: HttpClient,private router:Router) {}
 
  Exist(){
    if(sessionStorage.getItem('email'))
    return true;
    else
    return false;
  }
  logOut() {
    sessionStorage.clear();
    window.location.href ="/Acceuil";
  }

  authenticate(email, password) {
    email
    password
    console.log(email);
    console.log(password);
    if (email)
    return this.httpClient.get<boolean>('http://localhost:8081/login/'+email+"/"+password,httpOptions).pipe(
      map(
        userData => {
          console.log(userData);
        if(userData=="true"){
          sessionStorage.setItem("email",email);

          this.NgZone.run(() => this.router.navigateByUrl("/dashboard"))
          window.location.href ="/dashboard";
        }else{
          Swal.fire('Oops...', 'Account Does Not Exist!', 'error')
        return userData;
      }
        }
      )

    );
    
}

/* mt3 l id*/
}
