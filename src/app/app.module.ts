import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from './auth/register.component';
import { FacebookModule } from 'ngx-facebook';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { AlertModule } from './_alert';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AlertModule,
    SocialLoginModule,
    NgxTwitterTimelineModule,
    FacebookModule.forRoot(),
    NgbModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '158676774479-fn215ut4dem7lg1aj5c3a4r1rj8tai1n.apps.googleusercontent.com'
            ),
          }]
      }  as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule { }
