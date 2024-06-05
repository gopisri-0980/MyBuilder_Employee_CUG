import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnclearedChequeListComponent } from './uncleared-cheque-list.component';

describe('UnclearedChequeListComponent', () => {
  let component: UnclearedChequeListComponent;
  let fixture: ComponentFixture<UnclearedChequeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnclearedChequeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnclearedChequeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
