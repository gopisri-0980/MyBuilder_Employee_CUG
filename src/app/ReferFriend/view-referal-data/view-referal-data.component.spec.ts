import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReferalDataComponent } from './view-referal-data.component';

describe('ViewReferalDataComponent', () => {
  let component: ViewReferalDataComponent;
  let fixture: ComponentFixture<ViewReferalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReferalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReferalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
