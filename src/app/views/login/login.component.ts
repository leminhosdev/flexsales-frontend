import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
    
  constructor (private formBuilder: FormBuilder) {
    
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
    console.log('Formulário de Registro enviado!');
    
  }
}
