import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWaiveOffComponent } from './approve-waive-off.component';

describe('ApproveWaiveOffComponent', () => {
  let component: ApproveWaiveOffComponent;
  let fixture: ComponentFixture<ApproveWaiveOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveWaiveOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWaiveOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
