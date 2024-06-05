import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportfourComponent } from './reportfour.component';

describe('ReportfourComponent', () => {
  let component: ReportfourComponent;
  let fixture: ComponentFixture<ReportfourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
