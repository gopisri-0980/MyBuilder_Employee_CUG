import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewandapprovetwoComponent } from './viewandapprovetwo.component';

describe('ViewandapprovetwoComponent', () => {
  let component: ViewandapprovetwoComponent;
  let fixture: ComponentFixture<ViewandapprovetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewandapprovetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewandapprovetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
