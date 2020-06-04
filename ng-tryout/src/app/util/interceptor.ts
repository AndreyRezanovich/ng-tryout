import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req', req);
    const bearerToken = `Bearer ${localStorage.getItem('token')}`;
    const authHeaders = { headers: req.headers.set('Authorization', bearerToken) };
    const authReq = req.clone(req.url.includes('login') ? {} : authHeaders);
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('Server response');
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Unauthorized');
            }
          }
        }
      )
    );
  }
}
