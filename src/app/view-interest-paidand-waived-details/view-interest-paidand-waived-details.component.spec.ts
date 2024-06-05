import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterestPaidandWaivedDetailsComponent } from './view-interest-paidand-waived-details.component';

describe('ViewInterestPaidandWaivedDetailsComponent', () => {
  let component: ViewInterestPaidandWaivedDetailsComponent;
  let fixture: ComponentFixture<ViewInterestPaidandWaivedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterestPaidandWaivedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterestPaidandWaivedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
