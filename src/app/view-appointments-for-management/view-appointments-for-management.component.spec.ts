import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentsForManagementComponent } from './view-appointments-for-management.component';

describe('ViewAppointmentsForManagementComponent', () => {
  let component: ViewAppointmentsForManagementComponent;
  let fixture: ComponentFixture<ViewAppointmentsForManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAppointmentsForManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppointmentsForManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
