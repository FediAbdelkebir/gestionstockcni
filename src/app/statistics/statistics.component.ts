import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {StatistiquesService} from '../statistiques.service'
import { trigger, transition, query, style, animate, group,useAnimation  } from '@angular/animations';
import { bounce,jello,swing,flash,rubberBand,jackInTheBox,hinge,lightSpeedIn,slideInLeft,slideInRight,bounceIn,bounceOut,zoomOut } from 'ng-animate';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5}
    }))])
  ],
})
export class StatisticsComponent implements OnInit {
testchart=[]
LineChart=[]
PolarChart=[]
nbrBCEBCI;
ListBCI=[];
ListBCE=[];
ListenbrBCEBCI=[]
CodeStruct
CountBCI
CountBCE
StatnbrArticle
Statnbrcustomer
StatnbrRole
StatnbrStructure
Statnbrcustomer_SuperAdmin
Statnbrcustomer_Admin
Statnbrcustomer_RFournisseurn
Statnbrcustomer_AFournisseur
Statnbrcustomer_RMagasin
Statnbrcustomer_AMagasinAdmin
testnbrbce
  constructor(private Stat:StatistiquesService,private spinner: NgxSpinnerService) { }
calculBCI(){
  var CountBCI
  var StatnbrArticle
  var Statnbrcustomer
  var StatnbrRole
  var StatnbrStructure
  var Statnbrcustomer_SuperAdmin
  var Statnbrcustomer_Admin
  var Statnbrcustomer_RFournisseurn
  var Statnbrcustomer_AFournisseur
  var Statnbrcustomer_RMagasin
  var Statnbrcustomer_AMagasinAdmin
  this.Stat.StatnbrBCI(this.CodeStruct).subscribe(data=> {
    CountBCI=JSON.parse(data)
    console.log(CountBCI)
    sessionStorage.setItem("CountBCI",CountBCI)
   });
   this.Stat.StatnbrStructure().subscribe(data=> {
    StatnbrStructure=JSON.parse(data)
    console.log(StatnbrStructure)
    sessionStorage.setItem("StatnbrStructure",StatnbrStructure)
   });
   this.Stat.StatnbrArticle(this.CodeStruct).subscribe(data=> {
    StatnbrArticle=JSON.parse(data)
    console.log(StatnbrArticle)
    sessionStorage.setItem("StatnbrArticle",StatnbrArticle)
   });
   this.Stat.Statnbrcustomer(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer=JSON.parse(data)
    console.log(Statnbrcustomer)
    sessionStorage.setItem("Statnbrcustomer",Statnbrcustomer)
   });
   this.Stat.StatnbrRole().subscribe(data=> {
    StatnbrRole=JSON.parse(data)
    console.log(StatnbrRole)
    sessionStorage.setItem("StatnbrRole",StatnbrRole)
   });
   this.Stat.Statnbrcustomer_SuperAdmin(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer_SuperAdmin=JSON.parse(data)
    console.log(Statnbrcustomer_SuperAdmin)
    sessionStorage.setItem("Statnbrcustomer_SuperAdmin",Statnbrcustomer_SuperAdmin)
   });
   this.Stat.Statnbrcustomer_Admin(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer_Admin=JSON.parse(data)
    console.log(Statnbrcustomer_Admin)
    sessionStorage.setItem("Statnbrcustomer_Admin",Statnbrcustomer_Admin)
   });
   this.Stat.Statnbrcustomer_RFournisseurn(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer_RFournisseurn=JSON.parse(data)
    console.log(Statnbrcustomer_RFournisseurn)
    sessionStorage.setItem("Statnbrcustomer_RFournisseurn",Statnbrcustomer_RFournisseurn)
   });
   this.Stat.Statnbrcustomer_AFournisseur(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer_AFournisseur=JSON.parse(data)
    console.log(Statnbrcustomer_AFournisseur)
    sessionStorage.setItem("Statnbrcustomer_AFournisseur",Statnbrcustomer_AFournisseur)
   });
   this.Stat.Statnbrcustomer_RMagasin(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer_RMagasin=JSON.parse(data)
    console.log(Statnbrcustomer_RMagasin)
    sessionStorage.setItem("Statnbrcustomer_RMagasin",Statnbrcustomer_RMagasin)
   });
   this.Stat.Statnbrcustomer_AMagasinAdmin(this.CodeStruct).subscribe(data=> {
    Statnbrcustomer_AMagasinAdmin=JSON.parse(data)
    console.log(Statnbrcustomer_AMagasinAdmin)
    sessionStorage.setItem("Statnbrcustomer_AMagasinAdmin",Statnbrcustomer_AMagasinAdmin)
   });
   this.CodeStruct=sessionStorage.getItem("StructureUser");
   this.StatnbrStructure=sessionStorage.getItem("StatnbrStructure")
   this.StatnbrArticle=sessionStorage.getItem("StatnbrArticle")
   this.Statnbrcustomer=sessionStorage.getItem("Statnbrcustomer")
   this.StatnbrRole=sessionStorage.getItem("StatnbrRole")
   this.Statnbrcustomer_SuperAdmin=sessionStorage.getItem("Statnbrcustomer_SuperAdmin")
   this.Statnbrcustomer_Admin=sessionStorage.getItem("Statnbrcustomer_Admin")
   this.Statnbrcustomer_RFournisseurn=sessionStorage.getItem("Statnbrcustomer_RFournisseurn")
   this.Statnbrcustomer_AFournisseur=sessionStorage.getItem("Statnbrcustomer_AFournisseur")
   this.Statnbrcustomer_RMagasin=sessionStorage.getItem("Statnbrcustomer_RMagasin")
   this.Statnbrcustomer_AMagasinAdmin=sessionStorage.getItem("Statnbrcustomer_AMagasinAdmin")
   this.CountBCI=sessionStorage.getItem("CountBCI")
  for (var j = 0, len = this.CountBCI; j <= len; j++) {
    this.ListBCI=this.ListBCI.concat(j);
  }
  
}
refresh(){
  this.ngOnInit(); 
}
calculBCE(){
  var CountBCE
  this.Stat.StatnbrBCE(this.CodeStruct).subscribe(data=> {
    CountBCE=JSON.parse(data)
    console.log(CountBCE)
    sessionStorage.setItem("CountBCE",CountBCE)
   });
   this.CountBCE=sessionStorage.getItem("CountBCE")
   console.log("CountBCE : "+this.CountBCE)
   for (var j = 0, len = this.CountBCE; j <= len; j++) {
    this.ListBCE=this.ListBCE.concat(j);
  }
}
calculBCEBCI(){
  this.nbrBCEBCI=parseInt(this.CountBCE, 10)+parseInt(this.CountBCI, 10);
  console.log(this.nbrBCEBCI)
  for (var j = 0, len = this.nbrBCEBCI; j <= len; j++) {
    this.ListenbrBCEBCI=this.ListenbrBCEBCI.concat(j);
  }
}
showanimation(){
  this.spinner.show("Stat", {
    type: "ball-clip-rotate-multiple",
    size: "large",
    bdColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    fullScreen :false,
    template: "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />"
  });
  setTimeout(() => {
    this.spinner.hide("Stat");
  }, 100);

 }
  ngOnInit() {

    this.showanimation();
    this.ListBCI=[];
    this.ListBCE=[];
    this.ListenbrBCEBCI=[]
    this.calculBCI()
    /*Statistique 7otha kol w7da fi fct tinsech*/ 
    this.calculBCE()
    console.log(this.ListBCE)
    this.calculBCEBCI()
    var progress
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontSize=14;
    new Chart('testchart', {
      type: 'line',
      data: {
        labels: this.ListenbrBCEBCI,
        datasets: [{ 
            data: this.ListBCI,
            label: "BCI",
            borderColor: "#cf4b56",
            fill: true,
            backgroundColor:"#cf4b56"
          }, { 
            data: this.ListBCE,
            label: "BCE",
            borderColor: "#1a50d5",
            backgroundColor:"#1a50d5",
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Bande Commandes (Interne/Externe)'
        },
        scales:{
          yAxes:[{
            type:'logarithmic',
            ticks:{
            min:1,
            max:this.calculBCEBCI()}
          }]
        }
      }
    });
    
    this.LineChart=new Chart('LineChart',{
      type:'doughnut',
      data:{
        labels:["SuperAdmin","Admin","RespensableFournissuer","AgentFournisseur","RespensableMagasin","AgentMagasin"],
        datasets:[{
        label:'BCI',
        data:[this.Statnbrcustomer_SuperAdmin,this.Statnbrcustomer_Admin,this.Statnbrcustomer_RFournisseurn,this.Statnbrcustomer_AFournisseur,this.Statnbrcustomer_RMagasin,this.Statnbrcustomer_AMagasinAdmin],
        backgroundColor:['#f56473','#f44336','#4caf50','#00bcd4','#040505','#9c27b0'],
        borderColor:["#f54493"]
      }]},options:{
        title:{
          Text:'Nombres Des Utilisateurs/Role',
          display:true
        },
        animation:{
          hover:'easeOutBack'
        },
        scales:{
          yAxes:[{
            ticks:{begainAtZero:true}
          }]
        }
      }

    });

    this.PolarChart=new Chart('PolarChart',{
      type:'polarArea',
      data:{
        labels:["blue","green","yellow"],
        datasets:[{
        label:'vote now',
        data:[101,411,54],
        backgroundColor:['rgba(458,825,99)','rgba(545,744,41)','rgba(60,47,99)']
      }]},options:{
        title:{
          Text:'Chart to Line',
          display:true
        },
        scales:{
          yAxes:[{
            ticks:{begainAtZero:true}
          }]
        }
      }

    });
  }

}
