import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { trigger, transition, query, style, animate, group,useAnimation  } from '@angular/animations';
import { bounce,jello,swing,flash,rubberBand,jackInTheBox,hinge,lightSpeedIn,slideInLeft,slideInRight,bounceIn,bounceOut,zoomOut } from 'ng-animate';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 0.5}
    }))])
  ],
  
})
export class DashboardComponent implements OnInit {

  RoleStat=false;
  RoleArticle=false;
  RoleBCI=false;
  RoleBCE=false;
  RoleStruct=false;
  RoleSStruct=false;
  RoleClient=false;
  RoleGBCI=false;
  RoleGBCE=false;
/**
 INTERFACE MANAGEMENT
 */

  email;
  Roleuser;
  idlogout=true;
SCommandeEX=true;
SCommande=true;
Saccount=true;
Scustomers=true;
Slmagasin=true;
Samagasin=true;
Safournisseur=true;
Slfournisseur=true;
Shome=true;
gif=true;
Saf=true;
Sam=true;
Slf=true;
Slm=true;
Saarticle=true;
Slarticles=true;
SaA=true;
SlA=true;
LS=true;
Sgbce=true;
update=true;
  constructor(private CS:CustomerServiceService,private spinner: NgxSpinnerService) { 
    
  }
  
showaccount(){
 
  this.Saccount=false;
  this.SCommandeEX=true;
  this.Scustomers=true;
  this.Shome=true;
  this.Saf=true;
  this.Slf=true;
  this.Slm=true;
  this.Sam=true;
  this.SaA=true;
  this.SlA=true;
  this.LS=true;
  this.SCommande=true;
  this.Sgbce=true;
  this.update=true;
}
SHome(){
  this.SCommandeEX=true;
  this.Shome=!this.Shome
  if(this.Shome==true){
    this.gif=false;
  }else{
    this.gif=true;
  }
this.Scustomers=true;
this.Saccount=true;
this.Saf=true;
this.Slf=true;
this.Slm=true;
this.Sam=true;
this.SaA=true;
this.SlA=true;
this.LS=true;
this.SCommande=true;
this.Sgbce=true;
this.update=true;
}
showcustomers(){
  this.gif=true
  this.Scustomers=false;
  this.SCommandeEX=true;
  this.Saccount=true
  this.Shome=true;
  this.Saf=true;
  this.Slf=true;
  this.Slm=true;
  this.Sam=true;
  this.SaA=true;
  this.SlA=true;
  this.LS=true;
  this.SCommande=true;
  this.Sgbce=true;
  this.update=true;
}
Smagasin(){

  this.Samagasin=!this.Samagasin;
  this.Slmagasin=!this.Slmagasin;
}
Sarticle(){
  this.Saarticle=!this.Saarticle;
  this.Slarticles=!this.Slarticles;
}
Sfournisseur(){
  this.Safournisseur=!this.Safournisseur
  this.Slfournisseur=!this.Slfournisseur
}
 showanimation(){
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 3000);

 }

ajouterf(){
  this.gif=true
this.Saf=false;
this.SCommandeEX=true;
this.Saccount=true;
this.Scustomers=true;
this.Slmagasin=true;
this.Samagasin=true;
this.Safournisseur=true;
this.Slfournisseur=true;
this.Shome=true;
this.Slf=true;
this.Slm=true;
this.Sam=true;
this.SaA=true;
this.SlA=true;
this.LS=true;
this.SCommande=true;
this.Sgbce=true;
this.update=true;
}
listf(){
  this.gif=true
this.Slf=false;
this.SCommandeEX=true;
this.Saf=true;
this.Saccount=true;
this.Scustomers=true;
this.Slmagasin=true;
this.Samagasin=true;
this.Safournisseur=true;
this.Slfournisseur=true;
this.Shome=true;
this.Slm=true;
this.Sam=true;
this.SaA=true;
this.SlA=true;
this.LS=true;
this.SCommande=true;
this.Sgbce=true;
this.update=true;
}
ajouterm(){
  this.gif=true
  this.SCommande=true;
  this.SCommandeEX=true;
this.Sam=false;
this.Saf=true;
this.Saccount=true;
this.Scustomers=true;
this.Slmagasin=true;
this.Samagasin=true;
this.Safournisseur=true;
this.Slfournisseur=true;
this.Shome=true;
this.Slf=true;
this.Slm=true;
this.SaA=true;
this.SlA=true;
this.LS=true;
this.Sgbce=true;
this.update=true;
}
listm(){
  this.gif=true
  this.SCommandeEX=true;
  this.SCommande=true;
  this.Slm=false;
this.Sam=true;
this.Saf=true;
this.Saccount=true;
this.Scustomers=true;
this.Slmagasin=true;
this.Samagasin=true;
this.Safournisseur=true;
this.Slfournisseur=true;
this.Shome=true;
this.Slf=true;
this.SaA=true;
this.SlA=true;
this.LS=true;
this.SCommande=true;
this.Sgbce=true;
this.update=true;
}
ajoutera(){
  this.gif=true
  this.SaA=false;
  this.SCommandeEX=true;
  this.SlA=true;
  this.Sam=true;
  this.Saf=true;
  this.Saccount=true;
  this.Scustomers=true;
  this.Slmagasin=true;
  this.Samagasin=true;
  this.Safournisseur=true;
  this.Slfournisseur=true;
  this.Shome=true;
  this.Slf=true;
  this.Slm=true;
  this.LS=true;
  this.SCommande=true;
  this.Sgbce=true;
  this.update=true;
  }
  lista(){
    this.gif=true
    this.SlA=false;
    this.SCommandeEX=true;
    this.SaA=true;
    this.Slm=true;
  this.Sam=true;
  this.Saf=true;
  this.Saccount=true;
  this.Scustomers=true;
  this.Slmagasin=true;
  this.Samagasin=true;
  this.Safournisseur=true;
  this.Slfournisseur=true;
  this.Shome=true;
  this.Slf=true;
  this.LS=true;
  this.SCommande=true;
  this.Sgbce=true;
  this.update=true;
  }
  listS(){
    this.gif=true
    this.LS=false;
    this.SCommandeEX=true;
    this.SlA=true;
    this.SaA=true;
    this.Slm=true;
  this.Sam=true;
  this.Saf=true;
  this.Saccount=true;
  this.Scustomers=true;
  this.Slmagasin=true;
  this.Samagasin=true;
  this.Safournisseur=true;
  this.Slfournisseur=true;
  this.Shome=true;
  this.Slf=true;
  this.SCommande=true;
  this.Sgbce=true;
  this.update=true;
  }
  showCommande(){
    this.gif=true
    this.SCommande=false;
    this.SCommandeEX=true;
    this.Slm=true;
    this.Sam=true;
    this.Saf=true;
    this.Saccount=true;
    this.Scustomers=true;
    this.Slmagasin=true;
    this.Samagasin=true;
    this.Safournisseur=true;
    this.Slfournisseur=true;
    this.Shome=true;
    this.Slf=true;
    this.SaA=true;
    this.SlA=true;
    this.LS=true;
    this.Sgbce=true;
    this.update=true;
  }
  showCommandeEX(){
    this.gif=true
    this.SCommandeEX=false;
    this.SCommande=true;
    this.Slm=true;
    this.Sam=true;
    this.Saf=true;
    this.Saccount=true;
    this.Scustomers=true;
    this.Slmagasin=true;
    this.Samagasin=true;
    this.Safournisseur=true;
    this.Slfournisseur=true;
    this.Shome=true;
    this.Slf=true;
    this.SaA=true;
    this.SlA=true;
    this.LS=true;
    this.Sgbce=true;
    this.update=true;
  }
  showGBCE(){
    this.gif=true
    this.Sgbce=false;
    this.SCommandeEX=true;
    this.SCommande=true;
    this.Slm=true;
    this.Sam=true;
    this.Saf=true;
    this.Saccount=true;
    this.Scustomers=true;
    this.Slmagasin=true;
    this.Samagasin=true;
    this.Safournisseur=true;
    this.Slfournisseur=true;
    this.Shome=true;
    this.Slf=true;
    this.SaA=true;
    this.SlA=true;
    this.LS=true;
    this.update=true;
    
  }
  Update(){
    this.gif=true
    this.Sgbce=true;
    this.SCommandeEX=true;
    this.SCommande=true;
    this.Slm=true;
    this.Sam=true;
    this.Saf=true;
    this.Saccount=true;
    this.Scustomers=true;
    this.Slmagasin=true;
    this.Samagasin=true;
    this.Safournisseur=true;
    this.Slfournisseur=true;
    this.Shome=true;
    this.Slf=true;
    this.SaA=true;
    this.SlA=true;
    this.LS=true;
    this.update=false;
    
  }
  test(){
    console.log(this.CS.GetRole(this.email));
  }
  
  ngOnInit() {
    this.showanimation();
    /*jdida*/
    setTimeout(() => {
      this.CS.GetRole(this.email);
      this.CS.GetStructure(this.email);
                    }, 50);
    console.log(this.CS.GetStructure(this.email))
    setTimeout(() => {
}, 50);
    this.CS.GetStructureAr(sessionStorage.getItem('StructureUser'));
    setTimeout(() => {
    }, 50);
    this.CS.GetStructurelib(sessionStorage.getItem('StructureUser'));
    setTimeout(() => {
    }, 50);
    this.CS.findID(sessionStorage.getItem('StructureUser'));
    setTimeout(() => {
    }, 50);
    console.log(sessionStorage.getItem('StructureUser'))
    setTimeout(() => {
    }, 50);
    this.email=sessionStorage.getItem('email');
    this.Roleuser=sessionStorage.getItem('Roleuser')
    this.DisplayAcceuil();
    console.log(this.Roleuser)
  }
  logout(){
    sessionStorage.clear();
    window.location.href ="/home";
  }
  /*
  1=SuperAdmin
  2=Admin
  3=RespensableFournisseur
  4=AgentFournisseur
  5=RespensableMagasin
  6=AgentMagasin
  */
 
  DisplayAcceuil(){
    
    if (this.Roleuser==1){
  

      this.RoleStat=true;
      this.RoleArticle=true;
      this.RoleBCI=true;
      this.RoleBCE=true;
      this.RoleStruct=true;
      this.RoleSStruct=true;
      this.RoleClient=true;
      this.RoleGBCI=true;
      this.RoleGBCE=true;
    }
    if (this.Roleuser==2) {
      this.RoleStat=true;
      this.RoleArticle=true;
      this.RoleBCI=true;
      this.RoleBCE=true;
      this.RoleStruct=true;
      this.RoleSStruct=true;
      this.RoleClient=true;
      this.RoleGBCI=true;
      this.RoleGBCE=true;
      
    }
    if(this.Roleuser==3){
      this.RoleStat=true;
      this.RoleArticle=true;
      this.RoleBCI=true;
      this.RoleBCE=false;
      this.RoleStruct=false;
      this.RoleSStruct=false;
      this.RoleClient=false;
      this.RoleGBCI=true;
      this.RoleGBCE=false;
    }
    if(this.Roleuser==4){
      this.RoleStat=false;
      this.RoleArticle=false;
      this.RoleBCI=true;
      this.RoleBCE=false;
      this.RoleStruct=false;
      this.RoleSStruct=false;
      this.RoleClient=false;
      this.RoleGBCI=true;
      this.RoleGBCE=false;
    }
    if(this.Roleuser==5){
      this.RoleStat=true;
      this.RoleArticle=true;
      this.RoleBCI=false;
      this.RoleBCE=true;
      this.RoleStruct=false;
      this.RoleSStruct=false;
      this.RoleClient=false;
      this.RoleGBCI=false;
      this.RoleGBCE=true;
    }
    if(this.Roleuser==6){
      this.RoleStat=false;
      this.RoleArticle=false;
      this.RoleBCI=false;
      this.RoleBCE=true;
      this.RoleStruct=false;
      this.RoleSStruct=false;
      this.RoleClient=false;
      this.RoleGBCI=false;
      this.RoleGBCE=true;
    }
  }
 

  iddlogout(){
    this.idlogout=!this.idlogout;}
}
