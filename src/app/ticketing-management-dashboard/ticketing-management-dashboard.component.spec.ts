import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingManagementDashboardComponent } from './ticketing-management-dashboard.component';

describe('TicketingManagementDashboardComponent', () => {
  let component: TicketingManagementDashboardComponent;
  let fixture: ComponentFixture<TicketingManagementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingManagementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
