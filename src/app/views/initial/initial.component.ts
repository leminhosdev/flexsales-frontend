import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/entitys/ClientModel';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent {
   form!: FormGroup;
    user!: Client;
    file!: File;
  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService) {
    
  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    
     file:['']
   
   })
  
  }

  
  public getLoggedUser(){
  this.clientService.getLoggedUser().subscribe(
    userlogged => {
      console.log(userlogged.email)
      this.user = userlogged;
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
