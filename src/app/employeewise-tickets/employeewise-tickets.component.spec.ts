import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeewiseTicketsComponent } from './employeewise-tickets.component';

describe('EmployeewiseTicketsComponent', () => {
  let component: EmployeewiseTicketsComponent;
  let fixture: ComponentFixture<EmployeewiseTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeewiseTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeewiseTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
