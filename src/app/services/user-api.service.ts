import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Observable } from 'rxjs';
import { share, shareReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addUserToApi(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/${user.id}`);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
  }

  getUserListFromApi(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
