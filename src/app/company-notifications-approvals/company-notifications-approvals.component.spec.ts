import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNotificationsApprovalsComponent } from './company-notifications-approvals.component';

describe('CompanyNotificationsApprovalsComponent', () => {
  let component: CompanyNotificationsApprovalsComponent;
  let fixture: ComponentFixture<CompanyNotificationsApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNotificationsApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNotificationsApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
