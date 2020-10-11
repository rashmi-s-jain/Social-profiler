import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore

export class AuthService {
  AUTH_SERVER = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};

  constructor(private http: HttpClient) {
  }

  register(user) {
    return this.http.post(this.AUTH_SERVER + '/register', user, this.noAuthHeader);
  }

  singIn(user) {
    return this.http.post(this.AUTH_SERVER + '/authenticate', user, this.noAuthHeader);
  }

  isLoggedIn(): boolean {
    return (localStorage.getItem('ACCESS_TOKEN') !== null);
  }

  doLogIn(): void {
    this.authSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('FB_TOKEN');
    localStorage.removeItem('FB_ID');
    localStorage.removeItem('USER_NAME');
    localStorage.removeItem('TWITTER_NAME');
    this.authSubject.next(false);
  }
}
