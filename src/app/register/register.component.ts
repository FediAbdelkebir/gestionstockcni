import { Component, OnInit } from '@angular/core';
import {customer} from '../customer';
import {CustomerServiceService} from '../customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {RoleService} from '../role.service'
import {Role} from '../role';
import {StructureService} from '../structure.service'
import {Structure} from '../structure'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  customer: customer;
  RL:Role;
  St:Structure;
  constructor(private SS:StructureService,private route: ActivatedRoute,private router: Router,private customerservice:CustomerServiceService,private RS:RoleService ) { 
  this.customer=new customer();
  this.RL=new Role();
  this.St=new Structure();
  }
  structure;
  structurecode;
  structurear;
  structurelatin;
  role;
  rolename;
  item;
  itemname;

gotoCustomerList(){
this.router.navigate['/customerlist']
}
listroles=[];
liststructure=[];
  ngOnInit() {
    this.SS.findAll().subscribe(data=>{
      console.log(data)
      this.liststructure=data
        });
    this.RS.findAll().subscribe(dataa=>{
      this.listroles=JSON.parse(dataa)
        });
        
  }
  save() {
    this.St.id=this.structure;
    this.St.code=this.structurecode;
    this.St.lib_ar=this.structurear;
    this.St.lib_latin=this.structurelatin;
    var STRG=JSON.stringify(this.St);
    var CYC = JSON.parse(STRG);

    this.RL.Customer=this.customer;
    this.RL.Role=this.rolename;
    this.RL.idrole=this.role;
    /*Erreur CycObject -->*/
    var strg = JSON.stringify(this.RL);
    var cycObject = JSON.parse(strg);
    /*Erreur CycObject -->*/
    this.customer.role=cycObject;
    this.customer.Structure=CYC;
    this.customerservice.createCustomer(this.customer)
      .subscribe(data => console.log(data), error => console.log(error));
    this.customer = new customer();
   
  }
  login(){
    window.location.href="/home";
  }
  Structure(item){
    this.structure=item;
    console.log(this.structure)
  }
  StructureCode(item){
    this.structurecode=item;
    console.log(this.structurecode);
  }
  Structurear(item){
    this.structurear=item;
    console.log(this.structurear);
  }
  Structurelatin(item){
    this.structurelatin=item;
    console.log(this.structurelatin);
  }
  Role(item){
    this.role=item;
    console.log(this.role)
  }
  Rolename(item){
    this.rolename=item;
    console.log(this.rolename);
  }
}
