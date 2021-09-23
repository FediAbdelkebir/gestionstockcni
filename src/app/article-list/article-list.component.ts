import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service'
import { Article } from '../article';
import {StructureService} from '../structure.service'
import {Structure} from '../structure'
import Swal from 'sweetalert2';
import { Stock } from '../stock';
import {StockService} from '../stock.service'
import { trigger, transition, query, style, animate, group,useAnimation  } from '@angular/animations';
import { bounce,jello,swing,flash,rubberBand,jackInTheBox,hinge,lightSpeedIn,slideInLeft,slideInRight,bounceIn,bounceOut,zoomOut } from 'ng-animate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {SnotifyPosition, SnotifyStyle} from 'ng-snotify';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {Observable} from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { FamilleService } from '../famille.service';
import { SousFamilleService } from '../sous-famille.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5}
    }))])
  ],
  
})
export class ArticleListComponent implements OnInit {
  listarticles=[];
  articlelist=[];
  article:Article;
  disableBtn=false;
edit=true;
editmode=true;
newtitle;
articletitle=false;
articlelabel=false;
articledescription=false;
articleprix=false;

newarticletitle=false;
newarticlelabel=false;
newarticledescription=false;
newarticleprix=false;


articleqt=false;
articleqti=false;
newdescription;
newlabel;
newprix;
id;
structure;
structurecode;
structurear;
structurelatin;
St:Structure;
Stock:Stock;
Stockqt:number;
Stockqti:number;
cansave=true;
canupdate=true;
liststructure=[]
listfamille=[];
listsousfamille=[];
  constructor(private SFS:SousFamilleService,private FS:FamilleService,private spinner: NgxSpinnerService,private AS:ArticleService,private SS:StructureService,private STK:StockService,private snotifyService: SnotifyService) {
    this.article=new Article();
    this.St=new Structure();
    this.Stock=new Stock();
   }
  ngOnInit() {
    this.showanimation();
    this.SS.findAll().subscribe(data=>{
      console.log(data)
      this.liststructure=data
        });
    this.AS.findAll().subscribe(data=> {
      this.listarticles=JSON.parse(data)
   console.log(this.listarticles)
     });
     this.FS.findAll().subscribe(data=> {
      this.listfamille=JSON.parse(data)
   console.log(this.listfamille)
     });
     this.SFS.findAll().subscribe(data=> {
      this.listsousfamille=data;
   console.log(this.listsousfamille)
     });
    this.Structure();
    this.StructureCode();
    this.Structurear();
    this.Structurelatin();
  }

  refresh(){
    this.ngOnInit();

  }
  verif(item,item2,item3,item4){
    if((item==null) || (item2==null) ||(item3==null) ||(item4==0) ||(item4<1) ||(item4==null)||(item.length==0)||(item2.length==0)||(item3.length==0)||(item4.length==0)||(isNaN(item4))){
      return false;
    }
    else{
      return true;
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
  veriflength(item:String){
    if((item.length<1) || (item==null)){
      return false;
    }
    else{
      return true;
    }
  }
  Cansave(){
    if((this.article.title.length>0)&&((this.article.label.length>0)&&(this.article.description.length>0)&&(this.article.prix>0)&&(this.Stockqti>=1)&&(this.Stockqt>=1))){
      this.cansave=false;
    }
    else{
      this.cansave=true;
    }
  }
  Canupdate(){
    if((this.newtitle.length>0)&&((this.newlabel.length>0)&&(this.newdescription.length>0)&&(this.newprix>0))){
      this.canupdate=false;
    }
    else{
      this.canupdate=true;
    }
  }
  NAP(item){
    if(this.veriflength(item)){
      this.newarticleprix=true;
    }else{
      this.newarticleprix=false
    }
  }
  NAD(item){
    if(this.veriflength(item)){
      this.newarticledescription=true;
    }else{
      this.newarticledescription=false
    }
  }
  NAL(item){
    if(this.veriflength(item)){
      this.newarticlelabel=true;
    }else{
      this.newarticlelabel=false
    }
  }
  NAT(item){
    if(this.veriflength(item)){
      this.newarticletitle=true;
    }else{
      this.newarticletitle=false
    }
  }
  AT(item){
if(this.veriflength(item)){
  this.articletitle=true;
}else{
  this.articletitle=false
}

  }
  AL(item){
    if(this.veriflength(item)){
      this.articlelabel=true;
    }else{
      this.articlelabel=false
    }
  }
  Aqt(item){
    if(this.veriflength(item)){
      this.articleqt=true;
    }else{
      this.articleqt=false
    }
  }
  Aqti(item){
    if(this.veriflength(item)){
      this.articleqti=true;
    }else{
      this.articleqti=false
    }
  }
  AD(item){
    if(this.veriflength(item)){
      this.articledescription=true;
    }else{
      this.articledescription=false
    }
  }
  
  verifisnan(item){
    if(isNaN(item)){
      return false
    }else{
      return true;
    }
  }
  Delete(item){
    Swal.fire({
      title: 'Vous etes Sur?',
      text: 'Vous Allez Supprimer cette Article',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui,supprimer',
      cancelButtonText: 'Non,laisser'
    }).then((result) => {
      /*DELETE=TRUE*/
      if (result.value) {
        (this.AS.Delete(item).subscribe(
          data => {
            this.ngOnInit();
          }
        )
        );
        Swal.fire(
          'Supprimé!',
          'Article a été Supprimé.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        /*DELETE+FALSE*/
        Swal.fire(
          'Annulé',
          'Votre Article est Sur :)',
          'error'
        )
      }
    });    
    }
    Modify(id,title,label,description,prix){
      this.articlelist=this.listarticles;
      this.listarticles=[];
      this.editmode=true;
      this.edit=false;
      this.id=id;
      this.newtitle=title;
      this.newlabel=label;
      this.newdescription=description;
      this.newprix=prix;
      this.disableBtn=true;
    }
    update(item,newtitle,newlabel,newdescription,newprix){
      
      item=this.id;
      newtitle=this.newtitle;
      newlabel=this.newlabel;
      newprix=this.newprix;
      newdescription=this.newdescription;
      Swal.fire({
        title: 'Vous etes Sur',
        text: 'Vous Allez Modiffier cette Article!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui,modifier!',
        cancelButtonText: 'Non,ne rien faire'
      }).then((result) => {
        if (result.value) {
          this.AS.update(item,newtitle,newlabel,newdescription,newprix).subscribe(
            data=>{
    this.cancel();
    this.refresh();
            }
          );
          Swal.fire(
            'Mis a Jour!',
            'L Article '+newtitle+' a ete mis a jour',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Article est le meme :)',
            'error'
          )
        }
      });
    }
    
  
    
    cancel(){
      this.listarticles=this.articlelist;
      this.edit=true;
      this.editmode=true;
      this.disableBtn=false;
      this.article.title="";
      this.article.label="";
      this.article.description="";
      this.article.prix=null;
      this.cansave=true;
    }

    save() {
      if(this.verif(this.article.title,this.article.label,this.article.description,this.article.prix)){
      this.St.id=this.structure;
      this.St.code=this.structurecode;
      this.St.lib_ar=this.structurear;
      this.St.lib_latin=this.structurelatin;
      var STRG=JSON.stringify(this.St);
      var CYC = JSON.parse(STRG);
      this.article.Structure=CYC;
      this.Stock.idArticle=this.article;
      /*Stock*/ 
      
      this.Stock.idStructure=CYC;
      this.Stock.quantite=this.Stockqti;
      this.Stock.quantite_initial=this.Stockqt;
      var SSTRG=JSON.stringify(this.Stock);
      var SStock = JSON.parse(SSTRG);
      console.log(SStock);

      /*Stock*/ 
      /*Ajout Stock*/
      setTimeout(() => {
        this.STK.createStock(this.Stock)
        .subscribe(data => console.log(data), error => console.log(error));
        this.Stock=new Stock();
        this.article.title="";
        this.article.label="";
        this.article.description="";
        this.article.prix=null;
        this.Stockqt=0;
        this.Stockqti=0;
    }, 2000);
      /*Ajout Stock*/
      this.edit=true;
      this.refresh();
      this.disableBtn=false;
      this.editmode=true;
      Swal.fire(
        'Success!',
        'Article Ajouté.',
        'success'
      )
  }
  else{
    const errorAction = Observable.create(observer => {
      setTimeout(() => {
        observer.next({
          title: 'Erreur',
          body: 'Vérifier Vos Données Saisies',
          config: {
            closeOnClick: true,
            timeout: 2000,
            showProgressBar: true,
            position:SnotifyPosition.rightTop
          }
        });
        observer.complete();
      }, 2000);
    });
    this.snotifyService.async('Chargement...', 'Verification', errorAction);
  }
    }
    ajouter(){
      this.articlelist=this.listarticles;
      this.listarticles=[];
      this.editmode=false;
      this.disableBtn=true;
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
}
