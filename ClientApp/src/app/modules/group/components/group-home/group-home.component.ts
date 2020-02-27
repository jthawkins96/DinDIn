import { Component, OnInit } from '@angular/core';
import { GroupRole } from 'src/app/shared/models/group-role';
import { UserClientService } from 'src/app/core/services/user-client.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {

  groups: GroupRole[];
  userId: string;

  constructor(private userClient: UserClientService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.userClient.getGroups(this.userId).subscribe(groups => {
      this.groups = groups;
    });
  }

}
