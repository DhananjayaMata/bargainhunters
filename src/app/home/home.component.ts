import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { LogoutService } from '../logout.service'
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userId: string;
  userName: string;
  userCreated: boolean;
  user = new User('', '', '', '', '', '');  
  
  constructor(private logoutservice:LogoutService,private api: APIService, private router: Router) { }

  ngOnInit() {
    
    //todo : DJ to look at this later
    this.userName=this.logoutservice.getCurrentAuthenticatedUser();
    debugger;
    console.log("Auth user Name is:"+ this.userName);

    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.userName = user.username;
      this.userId = user.attributes.sub;
      let result = await this.api.GetUser(this.userId);
      if (!result) {
        this.userCreated = false;
        this.user = new User('', '', '', '', '', '');
      } else {
        this.userCreated = true;
       // this.showPhoto = !!result.image;
        this.user = new User(
          this.userId,
          result.username,
          result.firstName,
          result.lastName,
          result.bio,
          result.image
        )
      }
    })
    .catch(err => console.log(err));

  }
  // getCurrentAuthenticatedUser() {
  //   this.userName=this.logoutservice.getCurrentAuthenticatedUser();
  //   console.log("userName is:"+ this.userName);
    
  // }


  // logOut() {
  //   this.logoutservice.logOut();
  // }

  logOut() {
    Auth.signOut({ global: true })
    .then(data => {
      this.router.navigate(['/auth']);
    })
    .catch(err => console.log(err));
  }

}
