import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  posts: [];
  filtered: [];
  isFb = false;

  constructor(private authService: AuthService, private router: Router, private fb: FacebookService) {
    this.username = localStorage.getItem('USER_NAME');
    const initParams: InitParams = {
      appId: '3359867127422528',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('USER_NAME');
    if (localStorage.getItem('FB_TOKEN') !== null) {
      this.isFb = true;
      this.getPosts();
    }
  }

  logout(): void {
    this.authService.logout();
    this.fb.logout();
    this.router.navigateByUrl('/login');
  }

  loginWithFacebook(): void {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_posts'
    };
    this.fb.login(loginOptions)
      .then((response: LoginResponse) => {
          this.isFb = true;
          localStorage.setItem('FB_ID', response.authResponse.userID);
          localStorage.setItem('FB_TOKEN', response.authResponse.accessToken);
          this.getPosts();
        }
      )
      .catch((error: any) => console.error(error));
  }

  getPosts(): void {
    this.fb.api('/me/feed', 'get', {access_token: localStorage.getItem('FB_TOKEN'), fields: 'id,message,picture,shares,name,story'})
      .then((res: any) => {
        this.posts = res.data;
        this.filtered = res.data;
      })
      .catch((error: any) => console.error(error));
  }

  searchFbPosts(e): void {
    const search = e.target.value.toLowerCase();
    const filered = this.posts.filter((item: any) => {
      return (item.message !== undefined && item.message.toLowerCase().includes(search))
        || (item.story !== undefined && item.story.toLowerCase().includes(search)
          || (item.name !== undefined && item.name.toLowerCase().includes(search)));
    });
    console.log(filered);
    // @ts-ignore
    this.filtered = filered;
  }
}
