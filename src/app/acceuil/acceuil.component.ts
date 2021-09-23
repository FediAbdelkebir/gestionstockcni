import { Component, OnInit } from '@angular/core';
import {AuthService} from'../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(private Auth:AuthService,private router: Router) { }
useremail="";
  ngOnInit() {
    if(!this.Auth.Exist()){
      window.location.href ="/home";
    }else{
    this.useremail=sessionStorage.getItem("email");}

  }
  logout(){
    this.Auth.logOut();
    window.location.href ="/home";
      
  }
  listusers(){
    window.location.href ="/customerlist";
  }
  account(){
    this.router.navigate(['account']);
  }
  fournisseur(){
    this.router.navigate(['fournisseur']);
  }
  
}
