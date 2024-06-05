import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClosedTicketsComponent } from './view-closed-tickets.component';

describe('ViewClosedTicketsComponent', () => {
  let component: ViewClosedTicketsComponent;
  let fixture: ComponentFixture<ViewClosedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClosedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClosedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
