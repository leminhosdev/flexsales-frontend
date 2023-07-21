import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientServiceService } from '../services/client-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard {


  constructor( private routerr: Router, private clientService: ClientServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.clientService.isClientLoggedIn()){
        return true;
      } else {
        this.routerr.navigate(['/login']);
        return false;
      }
  
}

}
