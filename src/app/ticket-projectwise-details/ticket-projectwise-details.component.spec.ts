import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketProjectwiseDetailsComponent } from './ticket-projectwise-details.component';

describe('TicketProjectwiseDetailsComponent', () => {
  let component: TicketProjectwiseDetailsComponent;
  let fixture: ComponentFixture<TicketProjectwiseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketProjectwiseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketProjectwiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
