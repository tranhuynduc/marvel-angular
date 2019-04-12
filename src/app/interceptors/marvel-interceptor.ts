import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
  return next.handle(request).pipe(
    map((event: HttpEvent<any>) => {
      return event;
    }));
  }
}
