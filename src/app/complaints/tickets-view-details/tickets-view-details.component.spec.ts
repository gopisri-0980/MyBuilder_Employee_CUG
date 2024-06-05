import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsViewDetailsComponent } from './tickets-view-details.component';

describe('TicketsViewDetailsComponent', () => {
  let component: TicketsViewDetailsComponent;
  let fixture: ComponentFixture<TicketsViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
