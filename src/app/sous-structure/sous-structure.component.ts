import { Component, OnInit } from '@angular/core';
import {SousstructureService} from '../sousstructure.service'
import {SousStructure} from '../sous-structure';
import Swal from 'sweetalert2';
import {Structure} from '../structure'
@Component({
  selector: 'app-sous-structure',
  templateUrl: './sous-structure.component.html',
  styleUrls: ['./sous-structure.component.css']
})
export class SousStructureComponent implements OnInit {
  listsoustructure=[]
  sousstructurelist=[];
  newstructname=false;
  editmode=true;
edit=true;
disableBtn=false;
canupdate=true;
cansave=true;
newname;
newnom;
id;
nom;
structurecode;
structurear;
structurelatin;
soustructure:SousStructure;
structure
St:Structure;
articlenom=false;
  constructor(private S:SousstructureService) {
this.soustructure=new SousStructure()
this.St=new Structure();
   }

  ngOnInit() {    
    this.Structure();
    this.Structurear();
    this.Structurelatin();
    this.StructureCode();
    var codestruct=sessionStorage.getItem("StructureUser")
    console.log(codestruct)
    this.S.findAll(codestruct).subscribe(data=> {
      this.listsoustructure=data;
   console.log(this.listsoustructure);
     });
  }

  refresh(){
    this.ngOnInit();
  }
  Modify(nom){
    this.sousstructurelist=this.listsoustructure;
    this.listsoustructure=[];
    this.disableBtn=true;
    this.editmode=true;
    this.edit=false;
    this.newname=nom;
  }
  update(nom,newname){
    var CodeStruct=this.structurecode;
    nom=this.nom;
    newname;
    Swal.fire({
      title: 'Vous Etez sur?',
      text: 'Vous allez modifier cette Structure!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui,modifier!',
      cancelButtonText: 'Non, rien faire'
    }).then((result) => {
      if (result.value) {
        this.S.update(nom,newname,CodeStruct).subscribe(
          data=>{
  this.cancel();
  this.refresh();
          }
        );
        Swal.fire(
          'Mis a jour!',
          'Structure a ete mis a jour',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Structure est la meme :)',
          'error'
        )
      }
    })
    
  }
  cancel(){
    this.listsoustructure=this.sousstructurelist;
    this.edit=true;
    this.editmode=true;
    this.disableBtn=false;
  }
  save(nom) {
    this.St.id=this.structure;
    this.St.code=this.structurecode;
    this.St.lib_ar=this.structurear;
    this.St.lib_latin=this.structurelatin;

    
    var STRG=JSON.stringify(this.St);
    var CYC = JSON.parse(STRG);
    this.soustructure.structure=CYC;

    this.soustructure.nom=nom;
    console.log(this.soustructure)
    Swal.fire({
      title: 'Vous Etez sur?',
      text: 'Vous allez Ajouter cette Structure!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui,Ajouter!',
      cancelButtonText: 'Non, rien faire'
    }).then((result) => {
      if (result.value) {
        this.S.createsoustructure(this.soustructure)
        .subscribe(data => console.log(data), error => console.log(error));
      this.soustructure = new SousStructure();
      this.edit=true;
      this.ngOnInit();
      this.disableBtn=false;
      this.editmode=true;
        Swal.fire(
          'Ajouté!',
          'Structure a ete Ajouté',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La liste des structure est la meme :)',
          'error'
        )
      }
    })
   
  }
  ajouter(){
    this.sousstructurelist=this.listsoustructure;
    this.listsoustructure=[];
    this.editmode=false;
    this.edit=true;
    this.disableBtn=true;
  }
  Delete(item){
    var CodeStruct=this.structurecode;
    Swal.fire({
      title: 'Vous Etez sur?',
      text: 'Vous Allez Supprimé cette Sous-Structure ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non,rien faire'
    }).then((result) => {
      if (result.value) {
        (this.S.Delete(item,CodeStruct).subscribe(
          data => {
            this.ngOnInit();
          }
        )
        );
        Swal.fire(
          'Supprimé!',
          'SousStructure a ete supprimé.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'SousStructure est la meme :)',
          'error'
        )
      }
    });  
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

  Canupdate(){
    if((this.newname.length>0)){
      this.canupdate=false;
    }
    else{
      this.canupdate=true;
    }
  }
  Cansave(){
    if((this.nom.length>0)){
      this.cansave=false;
    }
    else{
      this.cansave=true;
    }
  }
  veriflength(item:String){
    if((item.length<1) || (item==null)){
      return false;
    }
    else{
      return true;
    }
  }
  NN(item){
    if(this.veriflength(item)){
      this.newstructname=true;
    }else{
      this.newstructname=false
    }
  }
  AN(item){
    if(this.veriflength(item)){
      this.articlenom=true;
    }else{
      this.articlenom=false
    }
  }
}
