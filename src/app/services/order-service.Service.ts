import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/enviroment/enviroment';
import { Client } from '../entitys/ClientModel';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Product } from '../entitys/Product.Model';
import { OrderEntity } from '../entitys/OrderEntityModel';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  baseUrl: String = enviroment.baseUrl;


  constructor(private httpClient: HttpClient, private route: Router) { }

  saveOrder(order: OrderEntity){
    const url = `${this.baseUrl}/saveorder`;
    return this.httpClient.post<OrderEntity>(url, order);
  }
  
}
