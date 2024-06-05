import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MprViewreportComponent } from './mpr-viewreport.component';

describe('MprViewreportComponent', () => {
  let component: MprViewreportComponent;
  let fixture: ComponentFixture<MprViewreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MprViewreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MprViewreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
