import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  userId: string;
  userName: string;

  constructor(private router: Router) { }

  public getCurrentAuthenticatedUser(){
    Auth.currentAuthenticatedUser({bypassCache:false}).then(async user => {
      debugger;
      // this.userName = user.username;
      // this.userId = user.attributes.sub;
      return user.username;
    })
      .catch(err => console.log(err));
      return "undefined";
  }
  
  public logOut() {
    Auth.signOut({ global: true })
    .then(data => {
      this.router.navigate(['/auth']);
    })
    .catch(err => console.log(err));
  }


}
