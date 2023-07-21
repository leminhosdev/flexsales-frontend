import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/entitys/ClientModel';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  form!: FormGroup;
  client!: Client;
  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService, private route: Router) {
    
  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
      clientName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      clientArea: [null, [Validators.required]]
   })
  
  }

  get clientName(){
    return this.form.get('clientName')!;
  }
  get email(){
    return this.form.get('email')!;
  }
  get password(){
    return this.form.get('password')!;
  }
  get clientArea(){
    return this.form.get('clientArea')!;
  }
  
  

  onRegisterSubmit() {
    if(this.form.invalid){
      return;
    }
    this.clientService.save(this.form.value).subscribe({
      next: (response) => {
        this.route.navigate(['']);
        console.log('saved');
      }
    })
    console.log('Formulário de Registro enviado!');
    
  }
}
