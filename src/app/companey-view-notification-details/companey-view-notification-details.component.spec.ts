import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaneyViewNotificationDetailsComponent } from './companey-view-notification-details.component';

describe('CompaneyViewNotificationDetailsComponent', () => {
  let component: CompaneyViewNotificationDetailsComponent;
  let fixture: ComponentFixture<CompaneyViewNotificationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaneyViewNotificationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaneyViewNotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
