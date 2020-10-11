import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../_alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./auth.component.css']
})
export class RegisterComponent implements OnInit {
  authForm: FormGroup;
  isSubmitted: boolean;
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              protected alertService: AlertService) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  /*Register user*/
  signUp(): void {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.authService.register(this.authForm.value).subscribe(
      res => {
        console.log(res);
        this.alertService.success('You have been registered successfully', this.options);
        this.router.navigateByUrl('/login');
      },
      err => {
        this.alertService.error('Error: ' + err.error.message);
      }
    );
  }
}
