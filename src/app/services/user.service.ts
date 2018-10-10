import { Injectable } from '@angular/core';

import { User } from '../user/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userListChanges = new Subject<User[]>();
  private userList: User[] = [];

  addUserToLocalList(user: User): void {
    this.userList.push(user);
  }

  getUsers(): User[] {
    return this.userList;
  }

  makeUserInstance(form): User {
    const { firstname, surname, city, country, gender } = form.value;
    const newUser = new User(firstname, surname, city, country, gender, this.addIdToUser());
    return newUser;
  }

  private addIdToUser(): number {
    const id: number = this.userList.length + 1;
    return id;
  }

  refreshUsersList(usersList: User[]) {
    this.userList = usersList;
  }

  deleteUser(user: User): void {
    const newUserList = this.userList.filter((existingUser) => user !== existingUser);
    this.userList = newUserList;
    console.log(this.userList);
    this.userListChanges.next(newUserList);
  }

}
