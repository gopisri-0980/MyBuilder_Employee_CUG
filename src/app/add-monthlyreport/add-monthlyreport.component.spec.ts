import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyreportComponent } from './add-monthlyreport.component';

describe('AddMonthlyreportComponent', () => {
  let component: AddMonthlyreportComponent;
  let fixture: ComponentFixture<AddMonthlyreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMonthlyreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonthlyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
