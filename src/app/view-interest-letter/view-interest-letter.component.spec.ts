import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterestLetterComponent } from './view-interest-letter.component';

describe('ViewInterestLetterComponent', () => {
  let component: ViewInterestLetterComponent;
  let fixture: ComponentFixture<ViewInterestLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterestLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterestLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
