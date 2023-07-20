import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  form!: FormGroup;
    
  constructor (private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      area: [null, [Validators.required]]
   })
  
  }

  get name(){
    return this.form.get('name')!;
  }
  get email(){
    return this.form.get('email')!;
  }
  get password(){
    return this.form.get('password')!;
  }
  get area(){
    return this.form.get('area')!;
  }



  onRegisterSubmit() {
    if(this.form.invalid){
      return;
    }
    console.log('Formulário de Registro enviado!');
    
  }
}
