import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationComplaintMasterComponent } from './escalation-complaint-master.component';

describe('EscalationComplaintMasterComponent', () => {
  let component: EscalationComplaintMasterComponent;
  let fixture: ComponentFixture<EscalationComplaintMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalationComplaintMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationComplaintMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
