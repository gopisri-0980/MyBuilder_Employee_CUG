import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsShowingComponent } from './flats-showing.component';

describe('FlatsShowingComponent', () => {
  let component: FlatsShowingComponent;
  let fixture: ComponentFixture<FlatsShowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatsShowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatsShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
