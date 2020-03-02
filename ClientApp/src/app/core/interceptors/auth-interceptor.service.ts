import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isLoggedIn.getValue()) {
      const token = localStorage.getItem('token');
      const updatedRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${ token }`
        }
      });
      return next.handle(updatedRequest);
    }

    return next.handle(req);
  }
}
