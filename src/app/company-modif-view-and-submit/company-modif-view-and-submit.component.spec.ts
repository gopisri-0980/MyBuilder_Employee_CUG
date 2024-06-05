import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyModifViewAndSubmitComponent } from './company-modif-view-and-submit.component';

describe('CompanyModifViewAndSubmitComponent', () => {
  let component: CompanyModifViewAndSubmitComponent;
  let fixture: ComponentFixture<CompanyModifViewAndSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyModifViewAndSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyModifViewAndSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
