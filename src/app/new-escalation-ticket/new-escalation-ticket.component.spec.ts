import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEscalationTicketComponent } from './new-escalation-ticket.component';

describe('NewEscalationTicketComponent', () => {
  let component: NewEscalationTicketComponent;
  let fixture: ComponentFixture<NewEscalationTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEscalationTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEscalationTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
