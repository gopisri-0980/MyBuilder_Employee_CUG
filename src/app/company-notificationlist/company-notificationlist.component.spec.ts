import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNotificationlistComponent } from './company-notificationlist.component';

describe('CompanyNotificationlistComponent', () => {
  let component: CompanyNotificationlistComponent;
  let fixture: ComponentFixture<CompanyNotificationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNotificationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNotificationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
