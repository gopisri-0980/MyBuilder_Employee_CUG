import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookYourAppointmentComponent } from './book-your-appointment.component';

describe('BookYourAppointmentComponent', () => {
  let component: BookYourAppointmentComponent;
  let fixture: ComponentFixture<BookYourAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookYourAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookYourAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
