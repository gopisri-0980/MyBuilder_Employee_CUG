import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedcustomerComponent } from './approvedcustomer.component';

describe('ApprovedcustomerComponent', () => {
  let component: ApprovedcustomerComponent;
  let fixture: ComponentFixture<ApprovedcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
