import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMonthlyReportProjectwiseComponent } from './ticket-monthly-report-projectwise.component';

describe('TicketMonthlyReportProjectwiseComponent', () => {
  let component: TicketMonthlyReportProjectwiseComponent;
  let fixture: ComponentFixture<TicketMonthlyReportProjectwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketMonthlyReportProjectwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMonthlyReportProjectwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
