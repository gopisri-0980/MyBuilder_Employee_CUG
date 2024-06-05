import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestWaiverDetailsComponent } from './interest-waiver-details.component';

describe('InterestWaiverDetailsComponent', () => {
  let component: InterestWaiverDetailsComponent;
  let fixture: ComponentFixture<InterestWaiverDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestWaiverDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestWaiverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
