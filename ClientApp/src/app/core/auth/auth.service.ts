import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { AuthToken } from 'src/app/shared/models/authToken.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedToken: any;
  authBaseUrl = `${environment.apiUrl}/auth`;
  jwtHelper = new JwtHelperService();
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.autoLogin();
  }

  login(username: string, password: string) {
    return this.httpClient.post<AuthToken>(`${this.authBaseUrl}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.httpClient.post(`${this.authBaseUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  autoLogin(): void {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    this.isLoggedIn.next(!isTokenExpired);

    if(!isTokenExpired)
      this.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
