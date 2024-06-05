import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageprojectdetailsComponent } from './singlepageprojectdetails.component';

describe('SinglepageprojectdetailsComponent', () => {
  let component: SinglepageprojectdetailsComponent;
  let fixture: ComponentFixture<SinglepageprojectdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepageprojectdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepageprojectdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
