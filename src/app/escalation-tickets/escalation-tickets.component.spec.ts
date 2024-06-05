import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationTicketsComponent } from './escalation-tickets.component';

describe('EscalationTicketsComponent', () => {
  let component: EscalationTicketsComponent;
  let fixture: ComponentFixture<EscalationTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalationTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
