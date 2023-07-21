import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
    
  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService) {
    
  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
     
   })
  
  }

 
  get email(){
    return this.form.get('email')!;
  }
  get password(){
    return this.form.get('password')!;
  }
  



  onRegisterSubmit() {
    if(this.form.invalid){
      return;
    }
    this.clientService.logIn(this.form.value)
    console.log('Formulário de Registro enviado!');
    
  }
}
