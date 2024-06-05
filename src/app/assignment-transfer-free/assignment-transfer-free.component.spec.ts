import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTransferFreeComponent } from './assignment-transfer-free.component';

describe('AssignmentTransferFreeComponent', () => {
  let component: AssignmentTransferFreeComponent;
  let fixture: ComponentFixture<AssignmentTransferFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTransferFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTransferFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
