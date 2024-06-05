import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBookingComponent } from './existing-booking.component';

describe('ExistingBookingComponent', () => {
  let component: ExistingBookingComponent;
  let fixture: ComponentFixture<ExistingBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
