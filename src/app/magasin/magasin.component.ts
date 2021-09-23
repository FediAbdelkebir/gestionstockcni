import { Component, OnInit } from '@angular/core';
import {Magasin} from '../magasin';
import {MagasinServiceService} from '../magasin-service.service'
@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
magasin:Magasin;
  constructor(private MS:MagasinServiceService) { }
  ngOnInit() {
    this.magasin = new Magasin();
  }
  save() {
    this.MS.createmagasin(this.magasin)
      .subscribe(data => console.log(data), error => console.log(error));
    this.magasin = new Magasin();
    alert('A New Mall Added !');
   
  }

}
