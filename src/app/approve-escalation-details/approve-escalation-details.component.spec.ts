import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEscalationDetailsComponent } from './approve-escalation-details.component';

describe('ApproveEscalationDetailsComponent', () => {
  let component: ApproveEscalationDetailsComponent;
  let fixture: ComponentFixture<ApproveEscalationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEscalationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEscalationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
