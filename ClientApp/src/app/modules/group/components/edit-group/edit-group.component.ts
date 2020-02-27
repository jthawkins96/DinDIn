import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupClientService } from 'src/app/core/services/group-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { BehaviorSubject, of } from 'rxjs';
import { UserClientService } from 'src/app/core/services/user-client.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  @ViewChild('userSearch', { static: false }) userSearch;
  editGroupForm: FormGroup;
  searchTerm$ = new BehaviorSubject<string>('');
  filteredUsers: User[] = [];
  keyword = 'username';
  selectedMember: User;
  currentMemberUsernames: string[] = [];
  showAddMemberButton = false;
  currentUserToken;

  get members() {
    return this.editGroupForm.controls.members as FormArray;
  }

  constructor(
    private groupClient: GroupClientService,
    private route: ActivatedRoute,
    private userClient: UserClientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserToken = this.authService.decodedToken;

    this.editGroupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      members: new FormArray([])
    });

    this.route.params
      .pipe(
        switchMap(params => {
          return this.groupClient.get(+params.id);
        })
      )
      .subscribe(response => {
        const currentMembers = response.members.filter(member => member.roleId !== 1);
        const currentMemberControls = new FormArray(currentMembers.map(member => new FormControl(member.userId)))
        this.currentMemberUsernames = currentMembers.map(member => member.username)
        this.editGroupForm.patchValue({
          name: response.name
        });
        this.editGroupForm.setControl("members", currentMemberControls);

        console.log(this.members)
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
        this.filteredUsers = users.filter(
          user => this.currentMemberUsernames.indexOf(user.username) < 0 && user.username !== this.currentUserToken.unique_name
        );
      });
  }

  onSelect(user: User) {
    this.selectedMember = user;
    this.showAddMemberButton = true;
  }

  addMember() {
    this.resetAutocompleteControl();
    this.members.push(new FormControl(this.selectedMember.id));
    this.currentMemberUsernames.push(this.selectedMember.username);
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

  onSubmit() {

  }
}
