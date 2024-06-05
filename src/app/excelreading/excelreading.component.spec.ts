import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelreadingComponent } from './excelreading.component';

describe('ExcelreadingComponent', () => {
  let component: ExcelreadingComponent;
  let fixture: ComponentFixture<ExcelreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
