import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAverageTimesidemenuComponent } from './ticket-average-timesidemenu.component';

describe('TicketAverageTimesidemenuComponent', () => {
  let component: TicketAverageTimesidemenuComponent;
  let fixture: ComponentFixture<TicketAverageTimesidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAverageTimesidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAverageTimesidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
