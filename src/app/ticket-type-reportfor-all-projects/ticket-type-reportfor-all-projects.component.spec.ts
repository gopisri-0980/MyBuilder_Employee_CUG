import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeReportforAllProjectsComponent } from './ticket-type-reportfor-all-projects.component';

describe('TicketTypeReportforAllProjectsComponent', () => {
  let component: TicketTypeReportforAllProjectsComponent;
  let fixture: ComponentFixture<TicketTypeReportforAllProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketTypeReportforAllProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeReportforAllProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
