import { UserService } from './../services/user.service';
import { Component, Input } from '@angular/core';
import { User } from './user';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;

  constructor(private userS: UserService) { }

  deleteUser(user: User, event: Event) {
    event.stopPropagation();
    this.userS.deleteUser(user);
  }

}
