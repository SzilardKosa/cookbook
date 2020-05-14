import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertModalComponent } from './advert-modal.component';

describe('AdvertModalComponent', () => {
  let component: AdvertModalComponent;
  let fixture: ComponentFixture<AdvertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
