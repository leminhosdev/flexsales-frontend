import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/enviroment/enviroment';
import { Client } from '../entitys/ClientModel';
import jwtDecode from 'jwt-decode';


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
  
  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token; 
   }
   
   getExpirationDate(token: string): Date | null{
    // const decoded: any = jwt_decode(token);
     const userDecoded: any = jwtDecode(token) as Client;
     if(userDecoded.exp === undefined){
        return null;
     }
     const date = new Date(0);
     date.setUTCSeconds(userDecoded.exp)
     return date;
    }


   isTokenExpired(token?: string):boolean{
    if(!token){
      return true;
    }
    const date = this.getExpirationDate(token);
    if( date === null){
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
   }

  isClientLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token){
      return false;
    } else if(this.isTokenExpired(token)){
      return false;
    }
    return true;
  }

  logIn(cliente: Client){
    const url = `${this.baseUrl}/login`;
    this.httpClient.post(url, cliente, {responseType: 'text'}).subscribe(
     {
       next: (resul) => {
         var token = JSON.parse(JSON.stringify(resul));
         localStorage.setItem('token', token);
         
       
         this.route.navigate(['']);
       }, error: (erro) => {
         console.log("Credenciais Incorretas ou inválidas");
       }
     }
   )
    }
}
