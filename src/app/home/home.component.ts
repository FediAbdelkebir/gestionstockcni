import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from '../customer-service.service';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';
import {customer} from '../customer';
import {AuthService} from '../auth.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  fieldTextType: boolean;
  email = ''
  password = ''
  invalidLogin = false
  item;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  userDetails = new FormGroup({
    Email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('',[
      Validators.required])
    }); 

    get Email(){
      return this.userDetails.get('Email')
      }
    
      get Password(){
      return this.userDetails.get('password')
      }
  constructor(private Auth:AuthService,private http:HttpClient,private router: Router,private customerservice:CustomerServiceService) { 
    this.customer=new customer();
  }

  ngOnInit() {
  }
  customer: customer;
  checkLogin() {
    if((this.email.length==0 )|| (this.password.length==0)){
      Swal.fire('Oops..','Veuillez Remplire Les Champs','error');
    }else{
    (this.Auth.authenticate(this.email, this.password).subscribe(
      data => {
        this.customerservice.GetRole(this.email);
        this.customerservice.GetStructure(this.email);
        this.customerservice.GetStructureAr(sessionStorage.getItem("StructureUser"));
        this.customerservice.GetStructurelib(sessionStorage.getItem("StructureUser"));
        this.router.navigate([''])
        this.invalidLogin = false
      },
      error => {
        Swal.fire('Oops..','Something Went Wrong','error');
        this.invalidLogin = true

      }
    )
    
    );

  }}
}
