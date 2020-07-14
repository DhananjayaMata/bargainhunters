import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import { MDBBootstrapModule } from 'angular-bootstrap-md'; 
import { FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LogoutService } from './logout.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [AmplifyService,LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
