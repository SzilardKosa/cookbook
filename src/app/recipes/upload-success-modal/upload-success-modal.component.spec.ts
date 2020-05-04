import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessModalComponent } from './upload-success-modal.component';

describe('UploadSuccessModalComponent', () => {
  let component: UploadSuccessModalComponent;
  let fixture: ComponentFixture<UploadSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
