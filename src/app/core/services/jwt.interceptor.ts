import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // No agregar token a rutas de login
    if (this.isDisallowedRoute(req.url)) {
      return next.handle(req);
    }

    const token = sessionStorage.getItem(environment.TOKEN_NAME);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }

  private isDisallowedRoute(url: string): boolean {
    const disallowedRoutes = [`${this.configService.apiUrl}/login`];
    return disallowedRoutes.some(route => url.startsWith(route));
  }
}
