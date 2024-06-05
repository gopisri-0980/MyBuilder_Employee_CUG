import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSevenUnrespondingTicketsComponent } from './table-seven-unresponding-tickets.component';

describe('TableSevenUnrespondingTicketsComponent', () => {
  let component: TableSevenUnrespondingTicketsComponent;
  let fixture: ComponentFixture<TableSevenUnrespondingTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSevenUnrespondingTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSevenUnrespondingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
