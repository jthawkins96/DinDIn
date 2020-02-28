import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/shared/models/group.model';
import { environment } from 'src/environments/environment';
import { GroupUser } from 'src/app/shared/models/group-user.model';

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

  deleteMember(groupId: number, userId: string) {
    return this.httpClient.delete(`${this.groupApiUrl}/deleteMember/${groupId}/${userId}`);
  }

  get(groupId: number) {
    return this.httpClient.get<Group>(`${this.groupApiUrl}/${groupId}`);
  }

  update(group: Group) {
    return this.httpClient.put(`${this.groupApiUrl}`, group);
  }

  addMemberToGroup(member: GroupUser) {
    return this.httpClient.post(`${this.groupApiUrl}/addMember`, member);
  }
}
