import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndUpdateAccountDetailsComponent } from './view-and-update-account-details.component';

describe('ViewAndUpdateAccountDetailsComponent', () => {
  let component: ViewAndUpdateAccountDetailsComponent;
  let fixture: ComponentFixture<ViewAndUpdateAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAndUpdateAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAndUpdateAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
