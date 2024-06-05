import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForInterestWaiverComponent } from './request-for-interest-waiver.component';

describe('RequestForInterestWaiverComponent', () => {
  let component: RequestForInterestWaiverComponent;
  let fixture: ComponentFixture<RequestForInterestWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForInterestWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForInterestWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
