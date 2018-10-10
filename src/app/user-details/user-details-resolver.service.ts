import { UserService } from './../services/user.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../user/user';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class UserDetailsResolver implements Resolve<User> {
  constructor(private userS: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise <User> | User {
    return this.userS.getUserById(+route.params['id']);
  }
}
