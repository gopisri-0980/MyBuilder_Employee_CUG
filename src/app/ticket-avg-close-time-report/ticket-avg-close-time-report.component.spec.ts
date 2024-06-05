import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAvgCloseTimeReportComponent } from './ticket-avg-close-time-report.component';

describe('TicketAvgCloseTimeReportComponent', () => {
  let component: TicketAvgCloseTimeReportComponent;
  let fixture: ComponentFixture<TicketAvgCloseTimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAvgCloseTimeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAvgCloseTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
