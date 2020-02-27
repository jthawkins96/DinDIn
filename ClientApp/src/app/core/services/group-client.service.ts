import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/shared/models/group.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupClientService {
  groupApiUrl = `${environment.apiUrl}/groups`


  constructor(private httpClient: HttpClient) { }

  addNewGroup(group: Group) {
    return this.httpClient.post(this.groupApiUrl, group);
  }

  delete(groupId: number) {
    return this.httpClient.delete(`${this.groupApiUrl}/${groupId}`);
  }
}
