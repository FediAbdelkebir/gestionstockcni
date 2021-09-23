import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BCE } from '../bce';
import { CommandeService } from '../commande.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-gestion-bce',
  templateUrl: './gestion-bce.component.html',
  styleUrls: ['./gestion-bce.component.css']
})
export class GestionBCEComponent implements OnInit {
  listbce=[];
  newetat;
  CBCE:BCE;
  Date;
  msgapprouve=true;
  Etat;
  CodeBCE;
  show=false;;
  SINVOICE=true;
  listINVOICE=[];
  ListidINVOICE=[];
  INVOICE=[];
  TOTAL=0;
  codestruct;
  Roleuser;
  accept=true;
  refuse=true;
  download=true;
  constructor(private CS:CommandeService) {
    this.CBCE=new BCE();
   }

  ngOnInit() {
    this.codestruct=sessionStorage.getItem("StructureUser");
    this.Access();
    this.CS.findAllBCE().subscribe(data=> {
      this.listbce=JSON.parse(data)
      for (let i = 0, len =this.listbce.length; i < len; i=i+1) {
        this.Gerer(this.listbce[i].etat,this.listbce[i].code_BCE);
      }
   console.log(this.listbce)
     });
  }
  refresh(){
    this.ngOnInit();
  }
  ReApprove(item){
    item=item.substring(0,9);
    if((this.Roleuser==1 ||this.Roleuser==2 || this.Roleuser==5) && (item=="Approuver")){
      return false;
    }
    else{
      return true;
    }
  }
  DeclineBCE(item){
    item;
    this.newetat="Réfusé Par "+sessionStorage.getItem("email");
    Swal.fire({
      title: 'Vous Etes Sur?.',
      text: 'Vous Allez Réfusé Cette BCE!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      /*DELETE=TRUE*/
      if (result.value) {
        (this.CS.DeclineBCE(item,this.newetat).subscribe(
          data => {
            this.ngOnInit();
            this.SINVOICE=true;
            this.show=false;
          }
        )
        );
        Swal.fire(
          'Réfusé!',
          'Vous Avez Réfusé cette BCE',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        /*DELETE+FALSE*/
        Swal.fire(
          'Annulé',
          'Commande Non Envoyé :)',
          'error'
        )
      }
    });    
    }
    ApproveBCE(item){
      item;
      this.newetat="Approuver Par "+sessionStorage.getItem("email");
      Swal.fire({
        title: 'Vous Etes Sur?.',
        text: 'Vous Allez Commander Ces Articles du BCE: '+this.CodeBCE,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.CS.ApproveBCE(item,this.newetat).subscribe(
            data=>{
              for (let i = 0, len =this.ListidINVOICE.length; i < len; i=i+1) {  
                console.log("id Article : "+this.ListidINVOICE[i][3])
                console.log("Quantité : "+this.ListidINVOICE[i][1])
                this.CS.UpdateINVOICE_BCE(this.ListidINVOICE[i][3],this.ListidINVOICE[i][1],this.codestruct).subscribe(data=>{
                  console.log(data)
                  
                });
              }
    this.refresh();
    this.SINVOICE=true;
    this.show=false;
            }
          );
          Swal.fire(
            'success!',
            'Demande De Commande Accepté.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Commande Non Envoyé:)',
            'error'
          )
        }
      });
     
    }
    ShowInovice(item1,item2,item3,item4){
      this.show=true;
      this.SINVOICE=false;
      this.TOTAL=0;
      var da:string;
      this.Etat=item2;
      this.Date=item4;
      this.CodeBCE=item3;
      this.CS.INVOICE(item3).subscribe(data=> {
        this.listINVOICE=JSON.parse(data)
        this.ListidINVOICE=JSON.parse(data)
        console.log(this.ListidINVOICE)
        for (let i = 0, len =this.listINVOICE.length; i < len; i=i+1) {  
          this.CS.NameArticle(this.listINVOICE[i][3]).subscribe(data=>{
            console.log(data)
            this.ListidINVOICE[i][3]=this.listINVOICE[i][3];
          
            this.listINVOICE[i][3]=data;
          });
          this.TOTAL=this.TOTAL+(this.listINVOICE[i][2])
          console.log(this.TOTAL)
                                                                        }
       });
      
       
      
    }
    exportAsPDF()
    {
      let data = document.getElementById('PDFF');  
      
      html2canvas(data).then(canvas => {
        let img = canvas.toDataURL('image/png');
        let pdf = new jspdf('l', 'cm', 'a4'); 
          pdf.setFontSize(12);
        pdf.setFontStyle('bold');
        pdf.addImage(img,'PNG', 0, 0, 19.7, 19.0);
        pdf.save(this.CodeBCE+'.pdf');   
      });
     } 
      
    
    close(){
      this.show=false;
      this.SINVOICE=true;
    }
  Gerer(item:string,item2:string){
    if((this.Roleuser!=6) && (!this.ReApprove(item)) &&(item!="NonValide")){
      this.msgapprouve=false;
      return true;
    }
    if(this.Roleuser!=6){
      return false;
    }
    if(item=="NonValide"){
      return true;
    }
    if(this.Roleuser==6 && item!="NonValide"){
      var app=item;
      item=item.substring(0,9);
      app=app.substring(0,6)
      
      if((app=="Réfusé")){
       
       return true;
      }
      
      
    }
  
  }
  App(item,item2){
    if(!this.Gerer(item,item2) && item=="NonValide"){
      return false;
    }
    else{return true}
  }
  
  Role(){
    
    if(this.Roleuser!=6){
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
      if(this.Roleuser==5){
        this.accept=true;
        this.refuse=true;
        this.download=false;
      }
      if(this.Roleuser==6){
        this.accept=false;
        this.refuse=false;
        this.download=true;
      }
      
      
    }

}
