import { Component, OnInit } from '@angular/core';
import {StructureService} from '../structure.service'
import {Structure} from '../structure';
import Swal from 'sweetalert2';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.css']
})
export class StructureListComponent implements OnInit {
structure:Structure;
  constructor(private SS:StructureService) { 
this.structure=new Structure();
  }
  canupdate=false;
  cansave=false;
  liststructures=[]
  structureslist=[];
  editmode=true;
edit=true;
disableBtn=false;
newcode;
newlib_ar;
newlib_latin;
structnewlatin=false;
structnewar=false;
structcode=false;
structar=false;
structlb=false;
id;
  ngOnInit() {
    this.SS.findAll().subscribe(data=> {
      this.liststructures=data;
   console.log(this.liststructures);
     });
  }
  refresh(){
    this.ngOnInit();
  }
  
  Delete(item){
    try{
    Swal.fire({
      title: 'Vous Etez sur?',
      text: 'Vous Allez Perdre cette Structure!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui,Effacer!',
      cancelButtonText: 'Non,rien faire'
    }).then((result) => {
      if (result.value) {
        (this.SS.Delete(item).subscribe(
          data => {
            this.ngOnInit();
          }
        )
        );
        Swal.fire(
          'Effacé!',
          'Structure a ete effacé.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Structure est la meme :)',
          'error'
        )
      }
    });  
  }catch(Exception){
    Swal.fire(
      'Erreur',
      'Clé Primaire est utilisé ailleur',
      'error'
    )
  }
}
    Modify(id,code,lib_ar,lib_latin){
      this.structureslist=this.liststructures;
      this.liststructures=[];
      this.disableBtn=true;
      this.editmode=true;
      this.edit=false;
      this.id=id;
      this.newlib_ar=lib_ar;
      this.newcode=code;
      this.newlib_latin=lib_latin;
    }
    update(item,newcode,newlib_ar,newlib_latin){
      var CodeStruct=sessionStorage.getItem("StructureUser");
      item=this.id;
      newcode=this.newcode;
      newlib_ar=this.newlib_ar;
      newlib_latin=this.newlib_latin;
      Swal.fire({
        title: 'Vous etes sure?',
        text: 'Vous Allez modifier cette Structure!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui,modifier!',
        cancelButtonText: 'Non,rien faire'
      }).then((result) => {
        if (result.value) {
          this.SS.update(newcode,newlib_ar,newlib_latin).subscribe(
            data=>{
    this.cancel();
    this.refresh();
            }
          );
          Swal.fire(
            'Mis a jour!',
            'Structure Modifié.',
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
      this.liststructures=this.structureslist;
      this.edit=true;
      this.editmode=true;
      this.disableBtn=false;
    }
    save() {
      
      Swal.fire({
        title: 'Vous etes sure?',
        text: 'Vous Allez Ajouter cette Structure!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui,Ajouter!',
        cancelButtonText: 'Non,rien faire'
      }).then((result) => {
        if (result.value) {
          this.SS.createstructure(this.structure)
          .subscribe(data => console.log(data), error => console.log(error));
        this.structure = new Structure();
        this.edit=true;
        this.ngOnInit();
        this.disableBtn=false;
        this.editmode=true;
          Swal.fire(
            'Ajouté!',
            'Structure Ajouté.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'La liste des structures est la meme :)',
            'error'
          )
        }
      })
    }
    ajouter(){
      this.structureslist=this.liststructures;
      this.liststructures=[];
      this.editmode=false;
      this.edit=true;
      this.disableBtn=true;
    }
    Cansave(){
      if((this.structure.code.length>0)&&((this.structure.lib_ar.length>0)&&(this.structure.lib_latin.length>0))){
        this.cansave=false;
      }
      else{
        this.cansave=true;
      }
    }
    Canupdate(){
      if((this.newcode.length>0)&&((this.newlib_ar.length>0)&&(this.newlib_latin.length>0))){
        this.canupdate=false;
      }
      else{
        this.canupdate=true;
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
    NLA(item){
      if(this.veriflength(item)){
        this.structnewar=true;
      }else{
        this.structnewar=false
      }
    }
    NLL(item){
      if(this.veriflength(item)){
        this.structnewlatin=true;
      }else{
        this.structnewlatin=false
      }
    }

    ASC(item){
      if(this.veriflength(item)){
        this.structcode=true;
      }else{
        this.structcode=false
      }
    }
    ASAR(item){
      if(this.veriflength(item)){
        this.structar=true;
      }else{
        this.structar=false
      }
    }
    ASLA(item){
      if(this.veriflength(item)){
        this.structlb=true;
      }else{
        this.structlb=false
      }
    }
}
