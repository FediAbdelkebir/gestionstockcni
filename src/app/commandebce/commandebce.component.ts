import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {Chart} from 'chart.js';
import {ArticleService} from '../article.service';
import {SousstructureService} from '../sousstructure.service'
import {BCE} from '../bce';
import {SousStructure} from '../sous-structure';
import {CommandeService} from '../commande.service';
import { Article } from '../article';
import { FamilleService } from '../famille.service';
import { SousFamilleService } from '../sous-famille.service';
import {Structure} from '../structure'
import Swal from 'sweetalert2';
import {StockService} from '../stock.service'
import { trigger, transition, query, style, animate, group,useAnimation  } from '@angular/animations';
import { bounce,jello,swing,flash,rubberBand,jackInTheBox,hinge,lightSpeedIn,slideInLeft,slideInRight,bounceIn,bounceOut,zoomOut } from 'ng-animate';

let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const lengthOfCode = 15;
@Component({
  selector: 'app-commandebce',
  templateUrl: './commandebce.component.html',
  styleUrls: ['./commandebce.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5}
    }))])
  ],
  
})

export class CommandebceComponent implements OnInit{
  listArticles=[]
  listfamilles=[]
  listsousfamilles=[]
  listsousstructure=[];
  bce=[];
  bci=[];
  sousstructurenom;
  sousstructure;
  QuantiteC;
  QuantitieE=1;
  QuantiteCOURANTE:number;
  QuantiteINITIAl:number;
  RESULTBCI=0;
  RESULTBCE=0;
  TOTAL;
  disabledCheckout=true;
  Cquantite=[];
  Cid=[];
  Cprix=[];
  St:Structure;
  SS:SousStructure;
  structure;
structurecode;
structurear;
structurelatin;
commande:BCE;
chartAux:Chart;

  constructor(private S:SousstructureService,private STK:StockService,private CS:CommandeService,private AS:ArticleService,private FA:FamilleService,private SFA:SousFamilleService) { 
    this.commande=new BCE();
    this.St=new Structure();
    this.SS=new SousStructure();
  }

  ngOnInit() {
    this.Structure();
    this.Structurear();
    this.Structurelatin();
    this.StructureCode();
   
    var code=this.structurecode;
    this.S.findAll(code).subscribe(data=>{
      this.listsousstructure=data;
      console.log(this.listsousstructure)
    })

    this.AS.findAll().subscribe(data=> {
      this.listArticles=JSON.parse(data)
   /*console.log(this.listArticles)*/
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
          console.log(this.listArticles[i].title+":"+this.listArticles[i].QuantiteINITIAl+":"+this.listArticles[i].QuantiteCOURANTE)
          this.createchart(this.listArticles[i].label,this.listArticles[i].QuantiteINITIAl,this.listArticles[i].QuantiteCOURANTE)
           }  }, 300);
      console.log(this.listArticles[j].QuantiteCOURANTE)}, error => console.log(error))}
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
  
  removeitem(item){
    const index: number = this.bce.indexOf(item);
    if (index !== -1) {
      this.RESULTBCE=this.RESULTBCE-(item.prix *item.QuantiteE);
      item.QuantiteE=0;
        this.bce.splice(index, 1);
        this.CanCheckout();
    }  
}
  refresh(){this.ngOnInit();
  }
  verifqt(item){
if((item==0)||(item==null)||(item<1)||(item.length==0)){
  return false;
}
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

  addbce(item){
    if(this.containsObject(item,this.bce)==false){
    this.bce=this.bce.concat(item);
    item.QuantiteE=0;
    this.CanCheckout();
    console.log(this.bce);
    }
  }
  CheckoutBCE(){
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
        for (var i = 0, len = this.bce.length; i < len; i++) {
          console.log(this.bce[i].QuantiteE);
          if((this.bce[i].QuantiteE==0)||(this.bce[i].QuantiteE==null)){
            SEND=false;
          }

        }
        if(SEND){
          console.log("SEND VALUE :"+SEND)
        var Cid;
        var Cquantite;
        var Cprix;
        var CCode;
        this.St.id=this.structure;
        this.St.code=this.structurecode;
        this.St.lib_ar=this.structurear;
        this.St.lib_latin=this.structurelatin;

        this.SS.ids=this.sousstructure;
        this.SS.nom=this.sousstructurenom;

        var STRG=JSON.stringify(this.St);
        var CYC = JSON.parse(STRG);
        this.SS.structure=CYC;
        
        this.commande.Structure=CYC;

        var SOUS=JSON.stringify(this.SS)
        var CYC_SOUS=JSON.parse(SOUS);
        this.commande.sousstructure=CYC_SOUS;


        this.commande.code_BCE=this.makeRandom(lengthOfCode, possible);
        CCode=this.commande.code_BCE;
        this.commande.etat="NonValide"; 
        this.commande.date=new Date().toString(); 
        
        this.CS.saveBCE(this.commande) .subscribe(data => {
          setTimeout(() => {
            console.log("Time IN : ");
            for (var i = 0, len = this.bce.length; i < len; i++) {
              this.Cquantite=this.Cquantite.concat(this.bce[i].QuantiteE);
              this.Cid=this.Cid.concat(this.bce[i].id);
              this.Cprix=this.Cprix.concat(this.bce[i].prix);
              console.log(this.Cquantite)
              console.log(this.Cid);
            }
            for (var j = 0, len = this.Cquantite.length; j < len; j++) {  
              
              Cprix=this.Cprix[j]*this.Cquantite[j];
              this.CS.testbce(this.Cquantite[j],Cprix,this.Cid[j],CCode).subscribe(data => console.log(data), error => console.log(error));
              
                
                
              }
              this.commande = new BCE();
            this.Cquantite=[];
            this.RESULTBCE=0;
            this.Cid=[];
            this.bce=[];
            Swal.fire(
              'Success!',
              'Demande De Commande Envoyé.',
              'success'
            )
                    }, 1000);
          console.log(data)
        }, error => console.log(error));
        console.log("Time Out : ");
        }
      }if(!SEND){
        Swal.fire(
          'Erreur',
          'Vérifier Les Quantités Demandés (Quantité>0)',
          'error'
        )
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Commande Non Envoyé:)',
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
  resetbce(){
    this.bce=null;
    this.bce=[];
    this.RESULTBCE=0;
    this.CanCheckout();
    console.log(this.bce);
  }
  CanCheckout(){
    var Can=true;
    for (var i = 0, len = this.bce.length; i < len; i++) {
      if((this.bce[i].QuantiteE==0)||(this.bce[i].QuantiteE==null)){
        Can=false;
      }
    }
     if((this.bce.length>0)&&(Can==false)){
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
  
 CalculBCE(item){
var total = 0;

		for (var i = 0, len = this.bce.length; i < len; i++) {
      if(this.bce[i].QuantiteE<=0 || this.bce[i].QuantiteE==null ||item>this.bce[i].QuantiteCOURANTE){
        this.disabledCheckout=true;
      }else{
        this.disabledCheckout=false;
      }
			total = total + this.bce[i].prix *this.bce[i].QuantiteE;
    }
    if (total<0){
      this.RESULTBCE=0;
    }else{
    this.RESULTBCE=total;
    console.log(this.RESULTBCE);}
 }
 createchart(item,item2,item3){
  item=item+"1";
  Chart.defaults.global.defaultFontSize=14;
    return new Chart(item, {
      type: 'pie',
      data: {
        labels: ["Quantite Courrante","Quantite Initial"],
        datasets: [{ 
            data: [[item3],[item2]],
            label: ["Quantite Courrante", "Quantite Initial"],
            borderColor: "#ef562d",
            fill: true,
            backgroundColor:["#ef562d", "#0c4c8a"]
          }
        ]
      },
      
    });
 
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
