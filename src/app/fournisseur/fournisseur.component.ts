import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../fournisseur';
import {FournisseurServiceService} from '../fournisseur-service.service'
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
Fournisseur:Fournisseur;
  constructor(private FournisseurService:FournisseurServiceService) { 
    this.Fournisseur=new Fournisseur();
  }

  ngOnInit() {
  }
  save() {
    this.FournisseurService.createfournisseur(this.Fournisseur)
      .subscribe(data => console.log(data), error => console.log(error));
    this.Fournisseur = new Fournisseur();
    alert('Registration Successful !');
   
  }
}
