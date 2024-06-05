import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsViewDetailsComponent } from './complaints-view-details.component';

describe('ComplaintsViewDetailsComponent', () => {
  let component: ComplaintsViewDetailsComponent;
  let fixture: ComponentFixture<ComplaintsViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
