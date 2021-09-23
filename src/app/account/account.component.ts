import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from '../customer-service.service'
import {AuthService} from'../auth.service';
import { Router } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private Auth:AuthService,private router: Router,private CS:CustomerServiceService) { }
  useremail="";
  email
  password
  name
  lastname
  tel:number
  
  uid=sessionStorage.getItem("id");
  
  uemail=sessionStorage.getItem("email");
  ngOnInit()   {
    this.identify();
    if(!this.Auth.Exist()){
    window.location.href ="/home";
  }else{
    this.email=sessionStorage.getItem("email");
  this.useremail=sessionStorage.getItem("email");}

}
identify(){
(this.CS.identification(this.uemail).subscribe(
  data => {

  }
)
);
}
update(){
  if(this.name!="" && this.lastname!="" && this.email!=""&& this.tel!=null && !isNaN(this.tel))
  {
  var id
  this.CS.findid(this.uemail).subscribe((data) => {
    
    (this.CS.update(data,this.email,this.password,this.name,this.lastname,this.tel).subscribe(
      data => {
    
      }
    )
    );
});

this.name="";
this.lastname="";
this.email="";
this.password="";
this.tel=null;
}
else{
  Swal.fire('Oops...', 'Veuillez Verifié les données saisies !', 'error')
}
}
delete(){
(this.CS.Delete(this.uid).subscribe(
    data => {
  
    }
  )
  );

}
}
