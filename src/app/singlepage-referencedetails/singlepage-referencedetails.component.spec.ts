import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageReferencedetailsComponent } from './singlepage-referencedetails.component';

describe('SinglepageReferencedetailsComponent', () => {
  let component: SinglepageReferencedetailsComponent;
  let fixture: ComponentFixture<SinglepageReferencedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepageReferencedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepageReferencedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
