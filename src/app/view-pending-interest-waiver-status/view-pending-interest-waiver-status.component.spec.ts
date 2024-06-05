import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingInterestWaiverStatusComponent } from './view-pending-interest-waiver-status.component';

describe('ViewPendingInterestWaiverStatusComponent', () => {
  let component: ViewPendingInterestWaiverStatusComponent;
  let fixture: ComponentFixture<ViewPendingInterestWaiverStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingInterestWaiverStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingInterestWaiverStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
