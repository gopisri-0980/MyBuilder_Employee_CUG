import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyComplaintsComponent } from './view-my-complaints.component';

describe('ViewMyComplaintsComponent', () => {
  let component: ViewMyComplaintsComponent;
  let fixture: ComponentFixture<ViewMyComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
