import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCreationListComponent } from './lead-creation-list.component';

describe('LeadCreationListComponent', () => {
  let component: LeadCreationListComponent;
  let fixture: ComponentFixture<LeadCreationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadCreationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCreationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
