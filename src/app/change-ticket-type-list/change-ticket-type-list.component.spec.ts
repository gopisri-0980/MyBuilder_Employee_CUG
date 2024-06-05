import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketTypeListComponent } from './change-ticket-type-list.component';

describe('ChangeTicketTypeListComponent', () => {
  let component: ChangeTicketTypeListComponent;
  let fixture: ComponentFixture<ChangeTicketTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTicketTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTicketTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
