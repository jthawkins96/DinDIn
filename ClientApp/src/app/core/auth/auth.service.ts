import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


import { environment } from '../../../environments/environment';
import { AuthToken } from 'src/app/shared/models/authToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authBaseUrl: string = `${environment.apiUrl}/auth`;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient.post<AuthToken>(`${this.authBaseUrl}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.httpClient.post(`${this.authBaseUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token')
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
