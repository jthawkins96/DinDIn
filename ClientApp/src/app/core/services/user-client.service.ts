import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserClientService {
  membersBaseUrl = `${environment.apiUrl}/members`;

  constructor(private httpClient: HttpClient) { }

  getUsers(searchTerm: string) {
    return this.httpClient.get<User[]>(`${this.membersBaseUrl}/${searchTerm}`);
  }

}
