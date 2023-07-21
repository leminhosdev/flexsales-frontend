import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { authinterceptor } from "./auth-interceptor"

export const HttpInterceptorProviders = [
 { provide: HTTP_INTERCEPTORS, useClass: authinterceptor, multi: true},
];