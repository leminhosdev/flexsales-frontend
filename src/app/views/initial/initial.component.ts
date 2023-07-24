import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent {
   form!: FormGroup;
    
  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService) {
    
  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
     
   })
  
  }

}
