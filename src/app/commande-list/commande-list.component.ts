import { Component, OnInit } from '@angular/core';
import { Commande } from '../commande';
import { CommandeService } from '../commande.service';
import Swal from 'sweetalert2';
import { BCE } from '../bce';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  listbci=[];
  listbce=[];
  CBCI:Commande;
  disableBtn=false;
edit=true;
editmode=true;
newetat;
id;
Date;
msgapprouve=true;
Etat;
CodeBCI;
Roleuser;
accept=false;
refuse=false;
download=false;
show=false;;
codestruct;
  SINVOICE=true;
  listINVOICE=[];
  INVOICE=[];
  TOTAL=0;
  constructor(private CS:CommandeService) {
    this.CBCI=new Commande();
   }
  ngOnInit() {
    this.Access();
    this.codestruct=sessionStorage.getItem("StructureUser");
    
    this.CS.findAllBCI().subscribe(data=> {
      this.listbci=JSON.parse(data)
   console.log(this.listbci)
     });
     
  }
  
  refresh(){
    console.log(this.codestruct);
    this.ngOnInit();
  }
  ShowInovice(item1,item2,item3,item4){
    this.show=true;
    this.SINVOICE=false;
    this.TOTAL=0;
    var da:string;
    this.Etat=item2;
    this.Date=item4;
    this.CodeBCI=item3;
    this.CS.INVOICEBCI(item3).subscribe(data=> {
      this.listINVOICE=JSON.parse(data)
      for (let i = 0, len =this.listINVOICE.length; i < len; i=i+1) {  
        console.log(this.listINVOICE[i][2])
        this.CS.NameArticle(this.listINVOICE[i][2]).subscribe(data=>{
          console.log(data)
          this.listINVOICE[i][2]=data;
        });
      }
     });
    
     
    
  }
  Gerer(item:string,item2:string){
    if((this.Roleuser!=4) && (!this.ReApprove(item)) &&(item!="NonValide")){
      this.msgapprouve=false;
      return true;
    }
    if(this.Roleuser!=4){
      return false;
    }
    if(item=="NonValide"){
      return true;
    }
    if(this.Roleuser==4 && item!="NonValide"){
      var app=item;
      item=item.substring(0,9);
      app=app.substring(0,6)
      
      if((app=="Réfusé")){

       return true;
      }
    
      
      
    }
  
  }
  Role(){
    if(this.Roleuser!=4){
      return false;
    }
    else{return true;}
  }
  isApproved(item){
    item=item.substring(0,6)

  if(item=="Réfusé"){
    return true;
  }
  else{
    return false;
  }
  }
  exportAsPDF()
  {
    let data = document.getElementById('PDF');  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); 
        pdf.setFontSize(12);
      pdf.setFontStyle('bold');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 19.7, 19.0);  
      pdf.save(this.CodeBCI+'.pdf');   
    });
   } 
    
  
  close(){
    this.show=false;
    this.SINVOICE=true;
  }
  DeclineBCI(item){
    item;
    this.newetat="Réfusé par "+sessionStorage.getItem("email");
    Swal.fire({
      title: 'Vous Etes sure?',
      text: 'Vous ne pourrez pas récupérer cette commande interne!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'oui, Refuser!',
      cancelButtonText: 'Non, Rien faire'
    }).then((result) => {
      /*DELETE=TRUE*/
      if (result.value) {
    
        (this.CS.DeclineBCI(item,this.newetat).subscribe(
          data => {
            this.ngOnInit();
            this.SINVOICE=true;
            this.show=false;
          }
        )
        );
        Swal.fire(
          'Réfusé!',
          'BCI a ete Réfusé.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        /*DELETE+FALSE*/
        Swal.fire(
          'Annulé',
          'Votre BCI est sûr :)',
          'error'
        )
      }
    });    
    }
    DeclineBCE(item){
      item;
      this.newetat="Réfusé par "+sessionStorage.getItem("email");
      Swal.fire({
        title: 'Vous Etes sure?',
        text: 'Vous ne pourrez pas récupérer cette commande externe!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Refusé!',
        cancelButtonText: 'Non, Rien faire'
      }).then((result) => {
        /*DELETE=TRUE*/
        if (result.value) {
          (this.CS.DeclineBCE(item,this.newetat).subscribe(
            data => {
              this.ngOnInit();
            }
          )
          );
          Swal.fire(
            'Refusé',
            'BCE a etes refusé.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          /*DELETE+FALSE*/
          Swal.fire(
            'Annulé',
            'Your BCE is safe :)',
            'error'
          )
        }
      });    
      }
    ApproveBCI(item,newetat){
      item;
      newetat="Approuver Par "+sessionStorage.getItem("email");
      Swal.fire({
        title: 'Vous Etes sure?',
        text: 'Vous approuverez BCI : '+this.CodeBCI,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Approuver!',
        cancelButtonText: 'Non, Rien Faire'
      }).then((result) => {
        var canaccept:boolean;
        if (result.value) {
          this.CS.INVOICEBCI(this.CodeBCI).subscribe(data=> {
            this.listINVOICE=JSON.parse(data)
            for (let i = 0, len =this.listINVOICE.length; i < len; i=i+1) {  
              console.log(this.listINVOICE[i][2])
              console.log(this.listINVOICE[i][1])

              setTimeout(() => {
              this.CS.UpdateINVOICE_BCI(this.listINVOICE[i][2],this.listINVOICE[i][1],this.codestruct).subscribe(data=>{
                console.log(data)
                
              });
                                },1000);

            }
           });
           
            this.CS.ApproveBCI(item,newetat).subscribe(
              data=>{
      this.cancel();
      this.refresh();
      this.SINVOICE=true;
      this.show=false;
              }
  
            );
            
            Swal.fire(
              'Approuvé',
              'Votre BCI a éte approuvé.',
              'success'
            )
           
           
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annuler',
            'BCI est sûr :)',
            'error'
          )
        }
      });
     
    }
    ApproveBCE(item,newetat){
      item;
      newetat="Approuver Par "+sessionStorage.getItem("email");
      Swal.fire({
        title: 'Vous Etes sure?',
        text: 'Vous approuverez ce BCE!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Approuver!',
        cancelButtonText: 'Non, Rien Faire'
      }).then((result) => {
        if (result.value) {
          this.CS.ApproveBCE(item,newetat).subscribe(
            data=>{
    this.cancel();
    this.refresh();
            }
          );
          Swal.fire(
            'Approuvé!',
            'Votre BCE a éte approuvé.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'BCE est sûr :)',
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
    ReApprove(item){

      item=item.substring(0,9);
      
      if((this.Roleuser==1 ||this.Roleuser==2 || this.Roleuser==3) && (item=="Approuver")){
        return false;
      }
      else{
        return true;
      }
    }
    Access(){
      this.Roleuser=sessionStorage.getItem('Roleuser')
      if(this.Roleuser==1){
      this.accept=true;
      this.refuse=true;
      this.download=true;
      }
      if(this.Roleuser==2){
        this.accept=true;
        this.refuse=true;
        this.download=true;
      }
      if(this.Roleuser==3){
        this.accept=true;
        this.refuse=true;
        this.download=false;
      }
      if(this.Roleuser==4){
        this.accept=false;
        this.refuse=false;
        this.download=true;
      }
      
      
    }
}
