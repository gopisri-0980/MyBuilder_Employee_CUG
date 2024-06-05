import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiveEscalationTicketsComponent } from './table-five-escalation-tickets.component';

describe('TableFiveEscalationTicketsComponent', () => {
  let component: TableFiveEscalationTicketsComponent;
  let fixture: ComponentFixture<TableFiveEscalationTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFiveEscalationTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFiveEscalationTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
