import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.user = data['user'];
      }
    );
  }

}
