import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-success-modal',
  templateUrl: './upload-success-modal.component.html',
  styleUrls: ['./upload-success-modal.component.css']
})
export class UploadSuccessModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
