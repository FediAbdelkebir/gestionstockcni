import { Component, OnInit } from '@angular/core';
import {StructureService} from '../structure.service'
@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  constructor(SS:StructureService) { }

  ngOnInit() {
  }

}
