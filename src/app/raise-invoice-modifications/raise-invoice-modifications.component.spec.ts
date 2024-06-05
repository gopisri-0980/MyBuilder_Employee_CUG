import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseInvoiceModificationsComponent } from './raise-invoice-modifications.component';

describe('RaiseInvoiceModificationsComponent', () => {
  let component: RaiseInvoiceModificationsComponent;
  let fixture: ComponentFixture<RaiseInvoiceModificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseInvoiceModificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseInvoiceModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
