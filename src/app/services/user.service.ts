import { Injectable } from '@angular/core';

import { User } from '../user/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userListChanges = new Subject<User[]>();
  private userList: User[] = [
    new User(1, 'Jan', 'Kowalski', 'Krakow', 'Poland', 'male'),
    new User(2, 'Tom', 'Buchman', 'Katowice', 'Poland', 'male')
  ];

  constructor() { }
  addUser(user: User) {
    this.userList.push(user);
    this.userListChanges.next([...this.userList, user]);
  }

  getUsers() {
    return this.userList;
  }

  deleteUser(user: User) {
    const newUserList = this.userList.filter((existingUser) => user !== existingUser);
    this.userList = newUserList;
    this.userListChanges.next(newUserList);
  }
}
