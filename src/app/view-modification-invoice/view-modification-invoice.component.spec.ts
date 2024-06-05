import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModificationInvoiceComponent } from './view-modification-invoice.component';

describe('ViewModificationInvoiceComponent', () => {
  let component: ViewModificationInvoiceComponent;
  let fixture: ComponentFixture<ViewModificationInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModificationInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModificationInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
