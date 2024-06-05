import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageticketdetailsComponent } from './singlepageticketdetails.component';

describe('SinglepageticketdetailsComponent', () => {
  let component: SinglepageticketdetailsComponent;
  let fixture: ComponentFixture<SinglepageticketdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepageticketdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepageticketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
