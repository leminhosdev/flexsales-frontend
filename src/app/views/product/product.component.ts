import { NgFor, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs';
import { OrderEntity } from 'src/app/entitys/OrderEntityModel';
import { Product } from 'src/app/entitys/Product.Model';
import { ProductServiceService } from 'src/app/services/product-service.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  form!: FormGroup;
  control = new FormControl();
  selectedProductControl = new FormControl(null);
  filteredStreets!: Observable<Product[]>

  SEARCH_URL: string = "http://localhost:8090/searchProduct?keyWord=";
  product: Product = [] as unknown as Product;
  productList: Product[] = [];
  totalPriceTobeAdded: number = 0;
  totalCommissionValueTobeAdded: number = 0;
  totalTaxesValueTobeAdded: number = 0;
  productsAmountTobeAdded: number = 0;
  totalItens = 0;
  order: OrderEntity = [] as unknown as OrderEntity;
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>, private formBuilder: FormBuilder, private productService: ProductServiceService, private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.product.name],
      price: [this.product.price],
      commission: [this.product.commission],
      taxes: [this.product.taxes],
      amount: [null],
   })
   
   this.filteredStreets = this.control.valueChanges.pipe(
    startWith(''),
    map(value => (typeof value === 'string' ? value.trim() : value.name.trim())),
    filter(value => value.length > 1),
    debounceTime(200),
    tap(value => console.log(value)),
    distinctUntilChanged(),
    switchMap(value =>  this.http.get<Product[]>(this.SEARCH_URL + encodeURIComponent(value)))
   )



   this.form.get('name')?.valueChanges.subscribe(value => {
    this.product.name = value;
  });


  this.form.get('price')?.valueChanges.subscribe(value => {
    this.product.price = parseFloat(value);
  });

  this.form.get('commission')?.valueChanges.subscribe(value => {
    this.product.commission = parseFloat(value);
  });

  this.form.get('taxes')?.valueChanges.subscribe(value => {
    this.product.taxes = parseFloat(value);
  });
 
  }
  
  
  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }


  searchByKeyword(keyword: any){
    
  }
  cancel(): void {
    this.dialogRef.close();
  }

  onRegisterSubmit(){
  
   
      
      const amount = parseFloat(this.form.get('amount')?.value);

      
      const productw: Product = {
        name: this.product.name,
        price: this.product.price,
        taxes: this.product.taxes,
        commission: this.product.commission,
        amount: amount,
        totalPrice: parseFloat((this.product.price * amount).toFixed(2)),
        
      };
     
      this.totalPriceTobeAdded += productw.totalPrice;
      this.totalTaxesValueTobeAdded += (productw.totalPrice * productw.taxes)/100 ;
      this.totalCommissionValueTobeAdded += ((productw.totalPrice - ((productw.totalPrice * productw.taxes)/ 100)) * productw.commission)/100;
      this.totalItens += amount;
      
  
      this.productList.push(productw)
      console.log('Product:', this.productList);
      
    
  }

 
  saveOrder(){
    const currentDate = new Date();
    
    this.order = {
    salesData: currentDate,
    totalCommissionValue: this.totalCommissionValueTobeAdded,
    totalPrice: this.totalPriceTobeAdded,
    totalTaxesValue: this.totalTaxesValueTobeAdded,
    productList: this.productList,
    productsAmount: this.totalItens

    }
    console.log(this.order)
  }
}

