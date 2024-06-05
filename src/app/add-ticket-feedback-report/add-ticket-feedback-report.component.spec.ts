import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketFeedbackReportComponent } from './add-ticket-feedback-report.component';

describe('AddTicketFeedbackReportComponent', () => {
  let component: AddTicketFeedbackReportComponent;
  let fixture: ComponentFixture<AddTicketFeedbackReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTicketFeedbackReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketFeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
