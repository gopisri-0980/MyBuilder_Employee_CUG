import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNotificationsModificationsComponent } from './company-notifications-modifications.component';

describe('CompanyNotificationsModificationsComponent', () => {
  let component: CompanyNotificationsModificationsComponent;
  let fixture: ComponentFixture<CompanyNotificationsModificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNotificationsModificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNotificationsModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
