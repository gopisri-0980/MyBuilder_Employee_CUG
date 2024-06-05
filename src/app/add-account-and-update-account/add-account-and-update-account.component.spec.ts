import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountAndUpdateAccountComponent } from './add-account-and-update-account.component';

describe('AddAccountAndUpdateAccountComponent', () => {
  let component: AddAccountAndUpdateAccountComponent;
  let fixture: ComponentFixture<AddAccountAndUpdateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountAndUpdateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountAndUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
