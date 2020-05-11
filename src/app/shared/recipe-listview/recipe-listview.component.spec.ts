import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListviewComponent } from './recipe-listview.component';

describe('RecipeListviewComponent', () => {
  let component: RecipeListviewComponent;
  let fixture: ComponentFixture<RecipeListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
