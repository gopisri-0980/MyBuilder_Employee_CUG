import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmPaymentOnlineEditComponent } from './crm-payment-online-edit.component';

describe('CrmPaymentOnlineEditComponent', () => {
  let component: CrmPaymentOnlineEditComponent;
  let fixture: ComponentFixture<CrmPaymentOnlineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmPaymentOnlineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmPaymentOnlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
