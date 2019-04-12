import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req, next){
    let authSrvice = this.injector.get(HttpService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Autorization:`Bearer ${authSrvice.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }


  constructor(private injector:Injector) { }
}
