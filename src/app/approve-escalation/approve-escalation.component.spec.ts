import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEscalationComponent } from './approve-escalation.component';

describe('ApproveEscalationComponent', () => {
  let component: ApproveEscalationComponent;
  let fixture: ComponentFixture<ApproveEscalationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEscalationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEscalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
