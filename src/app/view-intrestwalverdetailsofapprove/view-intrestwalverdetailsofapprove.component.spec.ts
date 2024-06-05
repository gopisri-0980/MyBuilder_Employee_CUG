import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIntrestwalverdetailsofapproveComponent } from './view-intrestwalverdetailsofapprove.component';

describe('ViewIntrestwalverdetailsofapproveComponent', () => {
  let component: ViewIntrestwalverdetailsofapproveComponent;
  let fixture: ComponentFixture<ViewIntrestwalverdetailsofapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIntrestwalverdetailsofapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIntrestwalverdetailsofapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
