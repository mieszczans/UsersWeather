import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'UsersWeather';
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
