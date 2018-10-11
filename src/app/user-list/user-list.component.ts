import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  usersList: User[];
  private subscription: Subscription;

  constructor(private userS: UserService) {}

  ngOnInit() {
    this.usersList = this.userS.getUsers();
    this.subscription = this.userS.userListChanges.subscribe((userList: User[]) => {
      this.usersList = userList;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
