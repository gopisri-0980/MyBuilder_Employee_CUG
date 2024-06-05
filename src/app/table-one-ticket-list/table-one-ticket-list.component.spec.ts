import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOneTicketListComponent } from './table-one-ticket-list.component';

describe('TableOneTicketListComponent', () => {
  let component: TableOneTicketListComponent;
  let fixture: ComponentFixture<TableOneTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOneTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOneTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
