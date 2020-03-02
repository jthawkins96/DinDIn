import { Component, OnInit } from '@angular/core';
import { GroupRole } from 'src/app/shared/models/group-role';
import { UserClientService } from 'src/app/core/services/user-client.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { GroupClientService } from 'src/app/core/services/group-client.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {
  groups: GroupRole[];
  userId: string;

  constructor(
    private userClient: UserClientService,
    private authService: AuthService,
    private groupClient: GroupClientService,
    private alertifyService: AlertifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.getGroups();
  }

  deleteGroup(groupId: number, groupName: string) {
    const deleteCb = () => {
      this.groupClient.delete(groupId).subscribe(
        _ => {
          this.alertifyService.success('Group was successfully deleted!');
          this.getGroups();
        },
        error => {
          console.log(error);
          this.alertifyService.error('Unable to delete group.');
        }
      );
    };

    this.alertifyService.confirm(`Are you sure you want to delete the '${groupName}' group?`, deleteCb);
  }

  editGroup(groupId: number) {
    this.router.navigate([`edit-group/${groupId}`], { relativeTo: this.route });
  }

  getGroups() {
    this.userClient.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }
}
