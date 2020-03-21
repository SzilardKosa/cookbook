import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.auth.user$.subscribe(user => this.user = user)
  }

}
