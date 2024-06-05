import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSixeEmployeewiseTktAvgClosingTimeComponent } from './table-sixe-employeewise-tkt-avg-closing-time.component';

describe('TableSixeEmployeewiseTktAvgClosingTimeComponent', () => {
  let component: TableSixeEmployeewiseTktAvgClosingTimeComponent;
  let fixture: ComponentFixture<TableSixeEmployeewiseTktAvgClosingTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSixeEmployeewiseTktAvgClosingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSixeEmployeewiseTktAvgClosingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
