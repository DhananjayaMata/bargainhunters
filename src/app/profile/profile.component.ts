import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { User } from '../user';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string;
  userName: string;
  userCreated: boolean;
  user = new User('', '', '', '', '', '');  
  
  constructor(private api: APIService, private router: Router) {}
  getType(): string {
    return this.userCreated ? 'UpdateUser' : 'CreateUser';
  }

  ngOnInit() {
    //this.showPhoto = false;
    
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
  
  async updateProfile() {
    const user = {
      id: this.userId,
      username: this.user.firstName + '_' + this.user.lastName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      bio: this.user.aboutMe,
      image: this.user.imageUrl
    }
    await this.api[this.getType()](user);
  }
  
  logOut() {
    Auth.signOut({ global: true })
    .then(data => {
      this.router.navigate(['/auth']);
    })
    .catch(err => console.log(err));
  }
}