import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableThreeAllTicketTypeProjectWiseComponent } from './table-three-all-ticket-type-project-wise.component';

describe('TableThreeAllTicketTypeProjectWiseComponent', () => {
  let component: TableThreeAllTicketTypeProjectWiseComponent;
  let fixture: ComponentFixture<TableThreeAllTicketTypeProjectWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableThreeAllTicketTypeProjectWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableThreeAllTicketTypeProjectWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
