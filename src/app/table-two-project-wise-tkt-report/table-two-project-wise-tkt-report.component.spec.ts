import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTwoProjectWiseTktReportComponent } from './table-two-project-wise-tkt-report.component';

describe('TableTwoProjectWiseTktReportComponent', () => {
  let component: TableTwoProjectWiseTktReportComponent;
  let fixture: ComponentFixture<TableTwoProjectWiseTktReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTwoProjectWiseTktReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTwoProjectWiseTktReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
