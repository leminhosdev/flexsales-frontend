import { NgFor, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  form!: FormGroup;
  control = new FormControl();
  filteredStreets!: Observable<String[]>
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  
  
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>, private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    
      price: [null],
      aa: [null],
      password: [null],
      jj: [null],
      p: [null],
   })
   
   this.filteredStreets = this.control.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
   )
  }
  
  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase()
    return this.streets.filter(street => street.toLowerCase().includes(filterValue))
  }
  
  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }
  cancel(): void {
    this.dialogRef.close();
  }


}

