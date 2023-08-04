import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/enviroment/enviroment';
import { Client } from '../entitys/ClientModel';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Product } from '../entitys/Product.Model';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseUrl: String = enviroment.baseUrl;


  constructor(private httpClient: HttpClient, private route: Router) { }

  searchProducts(keyWord: string = ""){
    const url = `${this.baseUrl}/searchProduct?keyWord=`+keyWord;
    this.httpClient.get<Product[]>(url);
  }
}
