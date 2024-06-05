import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGraphComponent } from './ticket-graph.component';

describe('TicketGraphComponent', () => {
  let component: TicketGraphComponent;
  let fixture: ComponentFixture<TicketGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
