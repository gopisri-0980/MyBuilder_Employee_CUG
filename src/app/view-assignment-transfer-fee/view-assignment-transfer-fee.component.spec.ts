import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignmentTransferFeeComponent } from './view-assignment-transfer-fee.component';

describe('ViewAssignmentTransferFeeComponent', () => {
  let component: ViewAssignmentTransferFeeComponent;
  let fixture: ComponentFixture<ViewAssignmentTransferFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssignmentTransferFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignmentTransferFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
