import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
