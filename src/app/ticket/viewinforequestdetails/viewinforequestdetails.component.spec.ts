import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinforequestdetailsComponent } from './viewinforequestdetails.component';

describe('ViewinforequestdetailsComponent', () => {
  let component: ViewinforequestdetailsComponent;
  let fixture: ComponentFixture<ViewinforequestdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinforequestdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinforequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
