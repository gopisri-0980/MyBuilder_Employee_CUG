import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOneProjectWiseTktCountComponent } from './table-one-project-wise-tkt-count.component';

describe('TableOneProjectWiseTktCountComponent', () => {
  let component: TableOneProjectWiseTktCountComponent;
  let fixture: ComponentFixture<TableOneProjectWiseTktCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOneProjectWiseTktCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOneProjectWiseTktCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
