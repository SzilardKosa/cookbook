import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.auth.user$.subscribe(user => this.user = user)
  }

  verifyEmail() {
    if(this.auth.isVerified()){
      return alert('You have already verified this address!');
    }

    this.auth.sendEmailVerification()
    .then(() => {
      return alert('We sent you an email!');
    })
    .catch(error => {
      console.log(error);
    });
  }

  deleteProfile() {
    this.modalService.open(ConfirmModalComponent, {backdrop: 'static'}).result.then((result) =>{
      console.log("OK");
      this.delete();
    }, (reason) => {
      console.log("Cancel");
    })
  }

  delete(){
    this.auth.deleteProfile()
    .then(() => {
      this.auth.logout();
    })
    .catch(error => {
      console.log(error);
    });
  }

}
