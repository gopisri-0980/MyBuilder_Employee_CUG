import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilestoneDetailsComponent } from './view-milestone-details.component';

describe('ViewMilestoneDetailsComponent', () => {
  let component: ViewMilestoneDetailsComponent;
  let fixture: ComponentFixture<ViewMilestoneDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMilestoneDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilestoneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
