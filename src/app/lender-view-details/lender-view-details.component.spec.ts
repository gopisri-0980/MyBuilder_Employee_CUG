import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderViewDetailsComponent } from './lender-view-details.component';

describe('LenderViewDetailsComponent', () => {
  let component: LenderViewDetailsComponent;
  let fixture: ComponentFixture<LenderViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
