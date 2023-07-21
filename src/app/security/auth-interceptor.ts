import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ClientServiceService } from "../services/client-service.service";

@Injectable()
export class authinterceptor implements HttpInterceptor{
    

    constructor(private clientService: ClientServiceService ){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
    
       const token = this.clientService.getAuthorizationToken();
       let request: HttpRequest<any> = req;
       
       if(token && !this.clientService.isTokenExpired(token)){
        request = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
       }

       return next.handle(request)
                .pipe(
                    catchError(this.handleError)
                );
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.error('Ocorreu um erro, tente novamente');
        } else {
            console.error(
                `Código do erro ${error.status}, ` + `Erro: ${JSON.stringify(error.error)}`
            );
        }

        return throwError('Ocorreu um erro, tente novamente');
        
    }

}