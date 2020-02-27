import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserClientService } from 'src/app/core/services/user-client.service';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Group } from 'src/app/shared/models/group.model';
import { GroupClientService } from 'src/app/core/services/group-client.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  @ViewChild('userSearch', { static: false }) userSearch;
  addGroupForm: FormGroup;
  searchTerm$ = new BehaviorSubject<string>('');
  filteredUsers: User[] = [];
  keyword = 'username';
  selectedMember: User;
  currentMembers: string[] = [];
  showAddMemberButton = false;
  currentUserToken;

  get members() {
    return this.addGroupForm.controls.members as FormArray;
  }

  constructor(
    private userClient: UserClientService,
    private groupClient: GroupClientService,
    private alertifyService: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.addGroupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      members: new FormArray([])
    });

    this.currentUserToken = this.authService.decodedToken;

    this.searchTerm$
      .pipe(
        debounceTime(500),
        switchMap(searchTerm => {
          if (searchTerm) return this.userClient.getUsers(searchTerm);
          return of([]);
        })
      )
      .subscribe((users: User[]) => {
        this.filteredUsers = users.filter(user => this.currentMembers.indexOf(user.username) < 0 && user.username !== this.currentUserToken.unique_name);
      });
  }

  onSelect(user: User) {
    this.selectedMember = user;
    this.showAddMemberButton = true;
  }

  addMember() {
    this.resetAutocompleteControl();
    this.members.push(new FormControl(this.selectedMember.id));
    this.currentMembers.push(this.selectedMember.username);
    this.showAddMemberButton = false;
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

  resetForm() {
    this.members.clear();
    this.addGroupForm.reset();
  }

  onSubmit() {
    const members = this.members.controls.map(control => {
      return { userId: control.value, roleId: 2 }
    });
    members.push({ userId: this.currentUserToken.nameid, roleId: 1 });

    const group: Group = {
      name: this.addGroupForm.get('name').value,
      members
    };

    this.groupClient.addNewGroup(group).subscribe(
      response => {
        console.log(response);
        this.alertifyService.success('Group successfully added!');
        this.resetForm();
      },
      error => {
        console.log(error);
        this.alertifyService.error('An error occurred while creating your group.');
      }
    );
  }
}
