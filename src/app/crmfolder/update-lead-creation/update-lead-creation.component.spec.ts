import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeadCreationComponent } from './update-lead-creation.component';

describe('UpdateLeadCreationComponent', () => {
  let component: UpdateLeadCreationComponent;
  let fixture: ComponentFixture<UpdateLeadCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeadCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeadCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
