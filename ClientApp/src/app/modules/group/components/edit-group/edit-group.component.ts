import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupClientService } from 'src/app/core/services/group-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { BehaviorSubject, of } from 'rxjs';
import { UserClientService } from 'src/app/core/services/user-client.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Group } from 'src/app/shared/models/group.model';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { GroupUser } from 'src/app/shared/models/group-user.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  editGroupForm: FormGroup;

  currentMembers: GroupUser[] = [];
  currentUserToken;
  groupId: number;

  //autcomplete control
  @ViewChild('userSearch', { static: false }) userSearch;
  searchTerm$ = new BehaviorSubject<string>('');
  filteredUsers: User[] = [];
  keyword = 'username';
  selectedMember: User;
  showAddMemberButton = false;

  constructor(
    private groupClient: GroupClientService,
    private route: ActivatedRoute,
    private userClient: UserClientService,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.currentUserToken = this.authService.decodedToken;

    this.editGroupForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.route.params
      .pipe(
        switchMap(params => {
          return this.groupClient.get(+params.id);
        })
      )
      .subscribe(response => {
        this.groupId = response.id;
        const members = response.members.filter(member => member.roleId !== 1);
        this.currentMembers = members;
        this.editGroupForm.patchValue({
          name: response.name
        });
      });

    this.searchTerm$
      .pipe(
        debounceTime(500),
        switchMap(searchTerm => {
          if (searchTerm) return this.userClient.getUsers(searchTerm);
          return of([]);
        })
      )
      .subscribe((users: User[]) => {
        const currentMemberUsernames = this.currentMembers.map(member => member.username);
        this.filteredUsers = users.filter(
          user =>
            currentMemberUsernames.indexOf(user.username) < 0 && user.username !== this.currentUserToken.unique_name
        );
      });
  }

  onSelect(user: User) {
    this.selectedMember = user;
    this.showAddMemberButton = true;
  }

  addMember() {
    this.resetAutocompleteControl();
    const addedMember = {
      groupId: this.groupId,
      userId: this.selectedMember.id,
      roleId: 2,
      username: this.selectedMember.username
    };
    this.showAddMemberButton = false;
    this.groupClient.addMemberToGroup(addedMember).subscribe(
      _ => {
        this.alertifyService.success('Member was added to the group!');
        this.currentMembers.push(addedMember);
      },
      error => {
        console.log(error);
        this.alertifyService.error('Unable to add member to group.');
      }
    );
  }

  deleteMember(userId: string, index: number) {
    this.groupClient.deleteMember(this.groupId, userId).subscribe(response => {
      this.alertifyService.success("Member was successfully deleted!");
      this.currentMembers.splice(index, 1);
    }, error => {
      console.log(error);
      this.alertifyService.error("Could not delete member from group.")
    });
  }

  resetAutocompleteControl() {
    this.userSearch.clear();
    this.userSearch.close();
    this.filteredUsers = [];
  }

  onChange(searchTerm) {
    this.showAddMemberButton = false;
    this.searchTerm$.next(searchTerm);
  }

  onClear() {
    this.showAddMemberButton = false;
  }

  onSubmit() {
    const updatedName = this.editGroupForm.get('name').value;
    this.groupClient.update({ id: this.groupId, name: updatedName }).subscribe(
      _ => {
        this.alertifyService.success('Group has been updated!');
      },
      error => {
        console.log(error);
        this.alertifyService.error('There was an error updating your group.');
      }
    );
  }
}
