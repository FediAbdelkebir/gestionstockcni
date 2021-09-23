import { Component, OnInit } from '@angular/core';
import {AuthService} from'../auth.service';
import {Fournisseur} from '../fournisseur';
import {FournisseurServiceService} from '../fournisseur-service.service'
import Swal from 'sweetalert2';
import {StructureService} from '../structure.service'
import {Structure} from '../structure'
@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {
  Fournisseur:Fournisseur;
  listproviders=[]
  constructor(private Auth:AuthService,private FS:FournisseurServiceService,private SS:StructureService) {
    this.Fournisseur=new Fournisseur();
    this.St=new Structure();
   }
   St:Structure;
editmode=true;
disableBtn=false;
edit=true;
newnom;
newadrf;
newnumf;
idf;
structure;
  structurecode;
  structurear;
structurelatin;
  ngOnInit() {
    if(!this.Auth.Exist()){
      window.location.href ="/home";
    }
    this.FS.findAll().subscribe(data=> {
      this.listproviders=JSON.parse(data)
     });
     this.Structure();
     this.StructureCode();
     this.Structurear();
     this.Structurelatin();   
  }
  Structure(){
    this.structure=sessionStorage.getItem("StructureID");
    console.log(this.structure)
  }
  StructureCode(){
    this.structurecode=sessionStorage.getItem("StructureUser");
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
  refresh(){
    this.ngOnInit();
  }
  Delete(item){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Fournisseur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        (this.FS.delete(item).subscribe(
          data => {
            this.ngOnInit();
          }
        )
        );
        Swal.fire(
          'Deleted!',
          'Fournisseur has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Fournisseur is safe :)',
          'error'
        )
      }
    });
   
      
    
    }
    Modify(idf,nomf,adrf,numf){
      this.disableBtn=true;
      this.editmode=true;
      this.edit=false;
      this.idf=idf;
      this.newnom=nomf;
      this.newadrf=adrf;
      this.newnumf=numf;
    }
    update(item,newnom,newadr,newnumf){
      item=this.idf;
      newnom=this.newnom;
      newadr=this.newadrf;
      newnumf=this.newnumf;
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will Update This Fournisseur!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.FS.update(item,newnom,newadr,newnumf).subscribe(
            data=>{
    this.cancel();
    this.refresh();
            }
          );
          Swal.fire(
            'Updated!',
            'Fournisseur Details Updated .',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Fournisseur is the same :)',
            'error'
          )
        }
      });
      
    }
    cancel(){
      this.edit=true;
      this.editmode=true;
      this.disableBtn=false;
    }
    save() {
      this.St.code=this.structurecode;
      this.St.id=this.structure;
      this.St.lib_ar=this.structurear;
      this.St.lib_latin=this.structurelatin;
      var STRG=JSON.stringify(this.St);
      var CYC = JSON.parse(STRG);
      this.Fournisseur.Structure=CYC;
      this.FS.createfournisseur(this.Fournisseur)
        .subscribe(data => console.log(data), error => console.log(error));
      this.Fournisseur = new Fournisseur();
      this.edit=true;
      this.ngOnInit();
      this.disableBtn=false;
      this.editmode=true;
    }
    ajouter(){
      this.editmode=false;
      this.edit=true;
      this.disableBtn=true;
    }

}
