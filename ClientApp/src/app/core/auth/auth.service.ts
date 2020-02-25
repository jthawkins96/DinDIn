import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthToken } from 'src/app/shared/models/authToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authBaseUrl: string = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient.post<AuthToken>(`${this.authBaseUrl}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.httpClient.post(`${this.authBaseUrl}/register`, { username, password });
  }
}
