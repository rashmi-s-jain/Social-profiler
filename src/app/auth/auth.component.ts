import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {AlertService} from '../_alert';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isSubmitted: boolean;
  constructor(private socialService: SocialAuthService,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              protected alertService: AlertService) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    /*Check for the already logged in state*/
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }
  /*Sign in with Google provider*/
  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      localStorage.setItem('ACCESS_TOKEN', String(user.authToken));
      localStorage.setItem('USER_NAME', String(user.name));
      this.authService.doLogIn();
      setTimeout(() => this.router.navigate(['/home']), 0);
    });
  }
  /*Normal Sign in method*/
  signIn(): void {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.authService.singIn(this.authForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('ACCESS_TOKEN', String(res.token));
        localStorage.setItem('USER_NAME', String(res.fullName));
        this.authService.doLogIn();
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
        this.alertService.error('Error: ' + err.error.message);
      }
    );
  }
}
