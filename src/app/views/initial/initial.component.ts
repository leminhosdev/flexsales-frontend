import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/entitys/ClientModel';
import { ExcelFile } from 'src/app/entitys/ExcelFileModel';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ProductComponent } from '../product/product.component';


@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent {
   form!: FormGroup;
    user!: Client;
    file!: File;
    client!: Client;
   

  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService,  public dialog: MatDialog) {
   
    
  }

 
 
  ngOnInit(): void {
   this.form = this.formBuilder.group({
   
     file:['']
   
   })
   this.getLoggedUser()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductComponent, {
     
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
  
  public getLoggedUser(){
  this.clientService.getLoggedUser().subscribe(
    userlogged => {
      this.client = userlogged;
    
    }
  ); 
  }
  

  onChange(event: any) {
    this.file = event.target.files[0];
}
  uploadFile(){
    this.clientService.uploadFile(this.file).subscribe(
      result => console.log(result)
    )
  }
}
