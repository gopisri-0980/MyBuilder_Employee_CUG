import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewLeagalInvoiceComponent } from './add-view-leagal-invoice.component';

describe('AddViewLeagalInvoiceComponent', () => {
  let component: AddViewLeagalInvoiceComponent;
  let fixture: ComponentFixture<AddViewLeagalInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViewLeagalInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViewLeagalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
