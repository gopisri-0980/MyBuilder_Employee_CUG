import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAssignmentTransferFeeComponent } from './approve-assignment-transfer-fee.component';

describe('ApproveAssignmentTransferFeeComponent', () => {
  let component: ApproveAssignmentTransferFeeComponent;
  let fixture: ComponentFixture<ApproveAssignmentTransferFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAssignmentTransferFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAssignmentTransferFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
