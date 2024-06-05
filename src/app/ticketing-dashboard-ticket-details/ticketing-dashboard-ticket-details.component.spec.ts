import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingDashboardTicketDetailsComponent } from './ticketing-dashboard-ticket-details.component';

describe('TicketingDashboardTicketDetailsComponent', () => {
  let component: TicketingDashboardTicketDetailsComponent;
  let fixture: ComponentFixture<TicketingDashboardTicketDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingDashboardTicketDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingDashboardTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
