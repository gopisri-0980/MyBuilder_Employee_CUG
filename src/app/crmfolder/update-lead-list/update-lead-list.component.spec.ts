import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeadListComponent } from './update-lead-list.component';

describe('UpdateLeadListComponent', () => {
  let component: UpdateLeadListComponent;
  let fixture: ComponentFixture<UpdateLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
