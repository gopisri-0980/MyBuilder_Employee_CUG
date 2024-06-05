import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintMonthlyReportProjectwiseComponent } from './complaint-monthly-report-projectwise.component';

describe('ComplaintMonthlyReportProjectwiseComponent', () => {
  let component: ComplaintMonthlyReportProjectwiseComponent;
  let fixture: ComponentFixture<ComplaintMonthlyReportProjectwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintMonthlyReportProjectwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintMonthlyReportProjectwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
