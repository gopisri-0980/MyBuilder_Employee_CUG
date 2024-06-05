import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompanyNotificationslistComponent } from './all-company-notificationslist.component';

describe('AllCompanyNotificationslistComponent', () => {
  let component: AllCompanyNotificationslistComponent;
  let fixture: ComponentFixture<AllCompanyNotificationslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCompanyNotificationslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompanyNotificationslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
