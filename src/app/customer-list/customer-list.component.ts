import { Component, OnInit } from '@angular/core';
import {customer} from '../customer'
import { CustomerServiceService } from '../customer-service.service';
import {AuthService} from'../auth.service';
import {StructureService} from '../structure.service'
import {Structure} from '../structure'
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import {RoleService} from '../role.service'
import Swal from 'sweetalert2';
import { Role } from '../role';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customer: customer;
  RL:Role;
  St:Structure;
  role;

  rolename;
  structure;
  structurecode;
  structurear;
  structurelatin;
  edit=true;
  editmode=true;
  disableBtn = false;
  id;
  newname;
  newlastname;
  newemail;
  newpassword;
  newtel;
  newStructure;
  LS
  constructor(private customerservice: CustomerServiceService,private Auth:AuthService,private router:Router,private RS:RoleService,private SS:StructureService) { 
    this.customer=new customer();
    this.RL=new Role();
    this.St=new Structure();
  }
  liststructure=[];
  listcustomers=[];
  customerslist=[];
  listroles=[];
  listallroles=[];
  CodeStructure;
  customername=false;
  customerlastname=false;
  customerpassword=false;
  customeremail=false;
  customertel=false;
  cansave=true;
  canupdate=true;

  newcustomername=false;
  newcustomerlastname=false;
  newcustomerpassword=false;
  newcustomeremail=false;
  newcustomertel=false;
  ngOnInit() {
    
    this.Structure();
    this.StructureCode();
    this.Structurear();
    this.Structurelatin();
    if(!this.Auth.Exist()){
      window.location.href ="/home";
    }
   this.customerservice.findAll().subscribe(data=> {
   this.listcustomers=JSON.parse(data);
   console.log(this.listcustomers);

   this.RS.findAll().subscribe(dataa=>{
    this.listroles=JSON.parse(dataa)
    console.log(this.listroles)
      });
      this.RS.findAllCustomerRoles().subscribe(dataa=>{
        this.listallroles=JSON.parse(dataa)
        console.log(this.listroles)
          });
   
  });
  }
  refresh(){
    this.ngOnInit();
    
  }
  Delete(item){
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cet utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        (this.customerservice.Delete(item).subscribe(
          data => {
            this.ngOnInit();
          }
        )
        );
        Swal.fire(
          'Effacé!',
          'l"utilisateur a été supprimé.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'l"utilisateur est sûr :)',
          'error'
        )
      }
    });
    }
    Role(item){
      this.role=item;
      console.log(this.role)
    }
    Rolename(item){
      this.rolename=item;
      console.log(this.rolename);
    }
    Structure(){
      this.structure=sessionStorage.getItem("StructureID");
      console.log(this.structure)
    }
    StructureCode(){
      this.structurecode=sessionStorage.getItem("StructureUser");
      this.CodeStructure=this.structurecode;
      console.log(this.structurecode);
    }
    Structurear(){
      this.structurear=sessionStorage.getItem("StructureAr");;
      console.log(this.structurear);
    }
    Structurelatin(){
      this.structurelatin=sessionStorage.getItem("Structurelib");
      console.log(this.structurelatin);
    }
    save(){
/*Structure*/
      this.St.code=this.structurecode;
      this.St.id=this.structure;
      this.St.lib_ar=this.structurear;
      this.St.lib_latin=this.structurelatin;
      var STRG=JSON.stringify(this.St);
      var CYC = JSON.parse(STRG);
/*Structure*/
/*Role*/
      this.RL.Customer=this.customer;
      this.RL.Role=this.rolename;
      this.RL.idrole=this.role;
      /*Erreur CycObject -->*/
      var strg = JSON.stringify(this.RL);
      var cycObject = JSON.parse(strg);
  /*Erreur CycObject -->*/
/*Role*/
      this.customer.Structure=CYC;
      this.customer.role=cycObject;

      this.customerservice.createCustomer(this.customer)
      .subscribe(data => console.log(data), error => console.log(error));
    this.customer = new customer();
    this.edit=true;
    this.ngOnInit();
    this.disableBtn=false;
    }
    ajouter(){
      this.customerslist=this.listcustomers;
    this.listcustomers=[];
      this.edit=false;
      this.disableBtn=true;
    }
    convertPassword(password) {
       password = password.toString();
      let encryPass = '*';
      for(let i=0; i< password.length -1 ;i++){
          encryPass =  encryPass + '*';
      }
      return encryPass;
  }
    cancel(){
      this.listcustomers=this.customerslist;
      this.edit=true;
      this.disableBtn=false;
      this.customer.email=null;
      this.customer.name=null;
      this.customer.password=null;
      this.customer.lastname=null;
      this.customer.tel=null;
      this.customer.email=null;
      this.customer.role=null;
    }

    cancelu(){
      this.listcustomers=this.customerslist;
      this.editmode=true;
    }
    Modify(id,name,lastname,email,password,tel){
      this.customerslist=this.listcustomers;
      this.listcustomers=[];

      this.editmode=false;
      this.id=id;
      this.newname=name;
      this.newlastname=lastname;
      this.newemail=email;
      this.newpassword="";
      this.newtel=tel;
    }
    update(item,newname,newlastname,newemail,newpassword,newtel){
      item=this.id;
      newname=this.newname;
      newlastname=this.newlastname;
      newemail=this.newemail;
      newpassword=this.newpassword;
      newtel=this.newtel;
      Swal.fire({
        title: 'Vous Etes Sur?',
        text: 'Vous mettrez à jour les détails de cet utilisateur!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, mettez-le à jour!',
        cancelButtonText: 'Non, garde-le'
      }).then((result) => {
        this.customerservice.update(item,newemail,newlastname,newname,newpassword,newtel).subscribe(
          data=>{
  this.cancelu();
  this.refresh();
          }
        );
        if (result.value) {
          Swal.fire(
            'MAJ!',
            'L"utilisateur a été mis à jour.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'L"utilisateur est le même :)',
            'error'
          )
        }
      })
     
    }
    veriflength(item:String){
      if((item.length<1) || (item==null)){
        return false;
      }
      else{
        return true;
      }
    }
    Cansave(){
      if((this.customer.name.length>0)&&(this.customer.lastname.length>0)&&(this.customer.email.length>0)&&(this.verifemail(this.customer.email))&&(this.customer.password.length>0)&&(this.customer.tel.length==8)){
        this.cansave=false;
      }
      else{
        this.cansave=true;
      }
    }
    Canupdate(){
      if((this.newname.length>0)&&(this.newlastname.length>0)&&(this.newemail.length>0)&&(this.verifemail(this.newemail))&&(this.newpassword.length>0)&&(this.newtel.length==8)){
        this.canupdate=false;
      }
      else{
        this.canupdate=true;
      }
    }

    
    NCname(item){
      if(this.veriflength(item)){
        this.newcustomername=true;
      }else{
        this.newcustomername=false
      }
    }
    NClastname(item){
      if(this.veriflength(item)){
        this.newcustomerlastname=true;
      }else{
        this.newcustomerlastname=false
      }
    }
    NCpassword(item){
      if(this.veriflength(item)){
        this.newcustomerpassword=true;
      }else{
        this.newcustomerpassword=false
      }
    }
    NCemail(item){
      if(this.veriflength(item)&&(this.verifemail(item))){
        this.newcustomeremail=true;
      }else{
        this.newcustomeremail=false
      }
    }
    NCtel(item){
      if(this.veriflength(item)){
        this.newcustomertel=true;
      }else{
        this.newcustomertel=false
      }
    }
    


    Cname(item){
      if(this.veriflength(item)){
        this.customername=true;
      }else{
        this.customername=false
      }
    }
    Clastname(item){
      if(this.veriflength(item)){
        this.customerlastname=true;
      }else{
        this.customerlastname=false
      }
    }
    Cpassword(item){
      if(this.veriflength(item)){
        this.customerpassword=true;
      }else{
        this.customerpassword=false
      }
    }

    verifemail(mailteste){
	var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

	if(reg.test(mailteste))
	{
		return(true);
	}
	else
	{
		return(false);
	}
}
    Cemail(item){
      if(this.veriflength(item)&&(this.verifemail(item))){
        this.customeremail=true;
      }else{
        this.customeremail=false
      }
    }
    Ctel(item){
      if(this.veriflength(item)){
        this.customertel=true;
      }else{
        this.customertel=false
      }
    }
}
