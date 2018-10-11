import { UserApiService } from './../services/user-api.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { User } from '../user/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  firstname: AbstractControl;
  surname: AbstractControl;
  country: AbstractControl;
  city: AbstractControl;
  gender: AbstractControl;

  constructor(
    private userS: UserService,
    private userApi: UserApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.refreshUserList();
  }

  createUserForm(): void {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.firstname = this.userForm.controls['firstname'];
    this.surname = this.userForm.controls['surname'];
    this.country = this.userForm.controls['country'];
    this.city = this.userForm.controls['city'];
    this.gender = this.userForm.controls['gender'];
  }

  addUser(form: User): void {
    const user = this.userS.makeUserInstance(form);
    this.sendRequestAddUser(user);
    this.clearForm();
  }

  clearForm() {
    this.userForm.reset();
  }

  sendRequestAddUser(user: User): void {
    this.userApi.addUserToApi(user)
    .subscribe(
      () => {
        this.userS.addUserToLocalList(user);
      },
      () => {
        console.log('Something wrong with request to add user');
      }
    );
  }

  refreshUserList(): void {
    this.userApi.getUserListFromApi()
    .subscribe(
      (usersList) => {
        this.userS.refreshUsersList(usersList);
        this.userS.userListChanges.next(usersList);
      },
      () => {
        console.log('Ups. Can not refresh userlist');
      }
    );
  }
}
