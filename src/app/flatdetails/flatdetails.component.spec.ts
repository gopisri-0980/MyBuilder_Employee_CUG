import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatdetailsComponent } from './flatdetails.component';

describe('FlatdetailsComponent', () => {
  let component: FlatdetailsComponent;
  let fixture: ComponentFixture<FlatdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
