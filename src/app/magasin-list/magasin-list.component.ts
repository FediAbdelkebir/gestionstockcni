import { Component, OnInit } from '@angular/core';
import {MagasinServiceService} from '../magasin-service.service'
import { Magasin } from '../magasin';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-magasin-list',
  templateUrl: './magasin-list.component.html',
  styleUrls: ['./magasin-list.component.css']
})
export class MagasinListComponent implements OnInit {
  listmarkets=[]
  editmode=true;
edit=true;
disableBtn=false;
newmagasin;
newadrm;
newnumm;
id;
  constructor(private MS:MagasinServiceService) { 
    this.Magasin=new Magasin();
  }
Magasin:Magasin;
  ngOnInit() {
    this.MS.findAll().subscribe(data=> {
      this.listmarkets=JSON.parse(data)
   console.log(this.listmarkets)
     });
  }
  refresh(){
    this.ngOnInit();
  }
  
  Delete(item){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Magasin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        (this.MS.Delete(item).subscribe(
          data => {
            this.ngOnInit();
          }
        )
        );
        Swal.fire(
          'Deleted!',
          'Magasin has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Magasin is safe :)',
          'error'
        )
      }
    });
    
      
    
    }
    Modify(id,magasin,adrm,numm){
      this.disableBtn=true;
      this.editmode=true;
      this.edit=false;
      this.id=id;
      this.newmagasin=magasin;
      this.newadrm=adrm;
      this.newnumm=numm;
    }
    update(item,newmagasin,newadrm,newnumm){
      item=this.id;
      newmagasin=this.newmagasin;
      newadrm=this.newadrm;
      newnumm=this.newnumm;
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will update this Magasin!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.MS.update(item,newmagasin,newadrm,newnumm).subscribe(
            data=>{
    this.cancel();
    this.refresh();
            }
          );
          Swal.fire(
            'updated!',
            'Your Magasin has been deleted.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your Magasin is the same :)',
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
    save() {
      this.MS.createmagasin(this.Magasin)
        .subscribe(data => console.log(data), error => console.log(error));
      this.Magasin = new Magasin();
      this.edit=true;
      this.ngOnInit();
      this.disableBtn=false;
      this.editmode=true;
    }
    ajouter(){
      this.editmode=false;
      this.edit=true;
      this.disableBtn=true;
    }
}
