import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentTimeSlotsComponent } from './create-appointment-time-slots.component';

describe('CreateAppointmentTimeSlotsComponent', () => {
  let component: CreateAppointmentTimeSlotsComponent;
  let fixture: ComponentFixture<CreateAppointmentTimeSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAppointmentTimeSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentTimeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
