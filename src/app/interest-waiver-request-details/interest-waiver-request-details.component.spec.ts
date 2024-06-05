import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestWaiverRequestDetailsComponent } from './interest-waiver-request-details.component';

describe('InterestWaiverRequestDetailsComponent', () => {
  let component: InterestWaiverRequestDetailsComponent;
  let fixture: ComponentFixture<InterestWaiverRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestWaiverRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestWaiverRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
