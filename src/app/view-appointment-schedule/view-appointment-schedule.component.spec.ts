import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentScheduleComponent } from './view-appointment-schedule.component';

describe('ViewAppointmentScheduleComponent', () => {
  let component: ViewAppointmentScheduleComponent;
  let fixture: ComponentFixture<ViewAppointmentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAppointmentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppointmentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
