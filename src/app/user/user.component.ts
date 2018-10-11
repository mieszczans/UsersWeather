import { ActivatedRoute } from '@angular/router';
import { UserApiService } from './../services/user-api.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from './user';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;

  constructor(private userS: UserService, private userApi: UserApiService, private route: ActivatedRoute) { }

  deleteUser(user: User) {
    this.userApi.deleteUser(user)
    .subscribe(
      () => {
        this.userS.deleteUser(user);
      },
      () => {
        console.log('Can not delete user in API');
      }
    );
  }

}
