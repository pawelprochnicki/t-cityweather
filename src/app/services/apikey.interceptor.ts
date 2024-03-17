import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiKey = environment.openWeatherMapApiKey;
    const apiUrl = environment.urlOpenWeatherMap;

    if (!request.url.includes(apiUrl)) {
      return next.handle(request);
    }

    const apiRequest = request.clone({
      setParams: {
        appid: apiKey,
      },
    });

    return next.handle(apiRequest);
  }
}
