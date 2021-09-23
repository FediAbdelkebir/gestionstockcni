import { Component, OnInit } from '@angular/core';
import {SousStructure} from '../sous-structure';
import {ArticleService} from '../article.service';
import {Commande} from '../commande';
import {CommandeService} from '../commande.service';
import { Article } from '../article';
import { FamilleService } from '../famille.service';
import { SousFamilleService } from '../sous-famille.service';
let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
import {SousstructureService} from '../sousstructure.service'
import {StructureService} from '../structure.service'
import {Structure} from '../structure'
import {StockService} from '../stock.service'
import {Chart} from 'chart.js';
import Swal from 'sweetalert2';
import { trigger, transition, query, style, animate, group,useAnimation  } from '@angular/animations';
import { bounce,jello,swing,flash,rubberBand,jackInTheBox,hinge,lightSpeedIn,slideInLeft,slideInRight,bounceIn,bounceOut,zoomOut } from 'ng-animate';
import { Console } from 'console';

  const lengthOfCode = 15;
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5}
    }))])
  ],
})

export class CommandeComponent implements OnInit {
  listArticles=[]
  listfamilles=[]
  listsousfamilles=[]
  bce=[];
  bci=[];
  listsousstructure=[];
  clicked=true;
  structure;
structurecode;
sousstructurenom;
sousstructure;
structurear;
SS:SousStructure;
structurelatin;
St:Structure;
QuantiteINITIAl:number;
QuantiteCOURANTE:number;
  QuantiteC=1;
  RESULTBCI=0;
  RESULTBCE=0;
  TOTAL;
  Cquantite=[];
  Cid=[];
  disabledCheckout=true;
commande:Commande;

  constructor(private S:SousstructureService,private STK:StockService,private CS:CommandeService,private AS:ArticleService,private FA:FamilleService,private SFA:SousFamilleService) { 
    this.commande=new Commande();
    this.St=new Structure();
    this.SS=new SousStructure();
  }

  ngOnInit() {
    this.Structure();
    this.StructureCode();
    this.Structurear();
    this.Structurelatin();
    var code=this.structurecode;

    this.S.findAll(code).subscribe(data=>{
      this.listsousstructure=data;
      console.log(this.listsousstructure)
    })
    this.AS.findAll().subscribe(data=> {{
      this.listArticles=JSON.parse(data)
      /*Quantite + Quantite Initial*/
   for (let i = 0, len = this.listArticles.length; i < len; i++) {
    this.STK.QTE_COURANTE(this.listArticles[i].id,code).subscribe(data =>{data
     this.listArticles[i].QuantiteCOURANTE=data
    console.log(this.listArticles[i].QuantiteCOURANTE)}, error => console.log(error))}

    for (let j = 0, len = this.listArticles.length; j < len; j++) {
      this.STK.QuantiteINITIAl(this.listArticles[j].id,code).subscribe(data =>{data
       this.listArticles[j].QuantiteINITIAl=data
       setTimeout(() => {
        for(let i=0,len=this.listArticles.length;i<len;i++){
          this.createchart(this.listArticles[i].label,this.listArticles[i].QuantiteINITIAl,this.listArticles[i].QuantiteCOURANTE)
           }  }, 50);
      console.log(this.listArticles[j].QuantiteCOURANTE)}, error => console.log(error))}
    }
   console.log(this.listArticles)
     });
     /*Quantite + Quantite Initial*/
     this.FA.findAll().subscribe(data=> {
      this.listfamilles=JSON.parse(data)
   console.log(this.listfamilles)
     });
     this.SFA.findAll().subscribe(data=> {
      this.listsousfamilles=JSON.parse(data)
   console.log(this.listsousfamilles)
     });
  }
  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
removeitem(item){
    const index: number = this.bci.indexOf(item);
    if (index !== -1) {
      this.RESULTBCI=this.RESULTBCI-(item.prix *item.QuantiteC);
      item.QuantiteC=1;
        this.bci.splice(index, 1);
        this.CanCheckout();
        console.log(this.bci)
    }  
}
createchart(item,item2,item3){
  item=item+"";
  Chart.defaults.global.defaultFontSize=14;
    return new Chart(item, {
      type: 'pie',
      data: {
        labels: ["Quantite Courrante","Quantite Initial"],
        datasets: [{ 
            data: [[item3],[item2]],
            label: ["Quantite Courrante", "Quantite Initial"],
            borderColor: "#d13076",
            fill: true,
            backgroundColor:["#97d5e0 ", "#d13076"]
          }
        ]
      },
      
    });
 
}
  addbci(item,ind){
    if(this.containsObject(item,this.bci)==false){
    this.bci=this.bci.concat(item);
    item.QuantiteC=0;
    this.CanCheckout();
    console.log(this.bci);
    }
  }
  

  CheckoutBCI(){
    
    var SEND=true;
    Swal.fire({
      title: 'Vous Etes Sure de Crée Cette Commande Interne?',
      text: 'Vous Allez Commander Ces Articles !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        for (var i = 0, len = this.bci.length; i < len; i++) {
          console.log(this.bci[i].QuantiteC);
          if((this.bci[i].QuantiteC==0)||(this.bci[i].QuantiteC==null)||(this.bci[i].QuantiteC>this.bci[i].QuantiteCOURANTE)){
            SEND=false;
          }

        }
      if(SEND){
        console.log("SEND VALUE :"+SEND)
    var Cid;
    var Cquantite;
    var CCBCI;
    /*Structure*/
    this.St.id=this.structure;
    this.St.code=this.structurecode;
    this.St.lib_ar=this.structurear;
    this.St.lib_latin=this.structurelatin;
    var STRG=JSON.stringify(this.St);
    var CYC = JSON.parse(STRG);
    /*Structure*/ 
    /*SousStructure*/
    this.SS.ids=this.sousstructure;
    this.SS.nom=this.sousstructurenom;
    
    /*SousStructure*/
    this.commande.code_BCI=this.makeRandom(lengthOfCode, possible);
    CCBCI=this.commande.code_BCI;
    this.commande.etat="NonValide";
    this.commande.date=new Date().toString();
    this.commande.Structure=CYC;
    this.SS.structure=CYC;

    var SOUS=JSON.stringify(this.SS)
    var CYC_SOUS=JSON.parse(SOUS);
    this.commande.sousstructure=CYC_SOUS;
    this.CS.saveBCI(this.commande) .subscribe(data => {
      setTimeout(() => {
        this.commande = new Commande();
        for (var i = 0, len = this.bci.length; i < len; i++) {
          this.Cquantite=this.Cquantite.concat(this.bci[i].QuantiteC);
          this.Cid=this.Cid.concat(this.bci[i].id);
          console.log(this.Cquantite)
          console.log(this.Cid);
        }
        for (let j = 0, len = this.Cquantite.length; j < len; j++) {
         
         this.CS.testbci(this.Cquantite[j],this.Cid[j],CCBCI).subscribe(data => console.log(data), error => console.log(error));
         
     
          }
          
          this.RESULTBCI=0;
      this.Cquantite=[];
      this.Cid=[];
      this.bci=[];
      Swal.fire(
       'Success!',
       'Demande De Commande Envoyé Au Réspensable.',
       'success'
     )

      
  }, 1000);
    console.log(data)}, error => console.log(error));
   
}
}if(!SEND){
  Swal.fire(
    'Erreur',
    '(Quantité <= 0) ou (Quantité < Quantité Courrante)',
    'error'
  )
}
 else if (result.dismiss === Swal.DismissReason.cancel) {
Swal.fire(
  'Annulé',
  'Commande Non Envoyé :)',
  'error'
)
}
})
  }
  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  resetbci(){
    for (var i = 0, len = this.bci.length; i < len; i++) {
      this.bci[i].QuantiteC==0;
    }
    this.bci=null;
    this.bci=[];
    this.RESULTBCI=0;
    this.CanCheckout();
    
    console.log(this.bci);
  }
 
 CalculBCI(item){
var total = 0;
		for (var i = 0, len = this.bci.length; i < len; i++) {
  
      if(this.bci[i].QuantiteC<=0 || this.bci[i].QuantiteC==null ||item>this.bci[i].QuantiteCOURANTE){
        this.disabledCheckout=true;
      }
      else{this.disabledCheckout=false;}
    }
 }
 testbci(quantite,id_article,idbci){
   console.log("CLICKED")
   this.CS.testbci(quantite,id_article,idbci).subscribe(data => console.log(data), error => console.log(error));
 }
 refresh(){this.ngOnInit();}
 CanCheckout(){
   
   var Can=true;
  for (var i = 0, len = this.bci.length; i < len; i++) {
    if(this.bci[i].QuantiteC==0){
      Can=false;
    }
  }
   if((this.bci.length>0)&&(Can==false)){
   this.disabledCheckout=false;}
   else{
     this.disabledCheckout=true;
   }
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
SousStructureid(item){
  this.sousstructure=item;
  console.log(this.sousstructure)
}
SousStructurenom(item){
  this.sousstructurenom=item;
  console.log(this.sousstructurenom);
}
}

