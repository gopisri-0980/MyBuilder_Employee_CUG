import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBankAccountDetailsComponent } from './update-bank-account-details.component';

describe('UpdateBankAccountDetailsComponent', () => {
  let component: UpdateBankAccountDetailsComponent;
  let fixture: ComponentFixture<UpdateBankAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBankAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBankAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
