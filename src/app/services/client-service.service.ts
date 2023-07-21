import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/enviroment/enviroment';
import { Client } from '../entitys/ClientModel';


@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  baseUrl: String = enviroment.baseUrl;


  constructor(private httpClient: HttpClient, private route: Router) { }

  save(cliet: Client){
    const url = `${this.baseUrl}/register`;
    return this.httpClient.post<Client>(url, cliet);
  }
}
