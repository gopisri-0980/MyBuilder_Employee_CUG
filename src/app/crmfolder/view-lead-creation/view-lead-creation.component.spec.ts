import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeadCreationComponent } from './view-lead-creation.component';

describe('ViewLeadCreationComponent', () => {
  let component: ViewLeadCreationComponent;
  let fixture: ComponentFixture<ViewLeadCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeadCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeadCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
