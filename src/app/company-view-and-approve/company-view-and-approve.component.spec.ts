import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewAndApproveComponent } from './company-view-and-approve.component';

describe('CompanyViewAndApproveComponent', () => {
  let component: CompanyViewAndApproveComponent;
  let fixture: ComponentFixture<CompanyViewAndApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyViewAndApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewAndApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
