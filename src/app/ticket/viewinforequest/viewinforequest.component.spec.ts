import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinforequestComponent } from './viewinforequest.component';

describe('ViewinforequestComponent', () => {
  let component: ViewinforequestComponent;
  let fixture: ComponentFixture<ViewinforequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinforequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinforequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
