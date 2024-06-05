import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscaltionTicketdetailsComponent } from './escaltion-ticketdetails.component';

describe('EscaltionTicketdetailsComponent', () => {
  let component: EscaltionTicketdetailsComponent;
  let fixture: ComponentFixture<EscaltionTicketdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscaltionTicketdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaltionTicketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
