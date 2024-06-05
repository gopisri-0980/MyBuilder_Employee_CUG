import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRecieptOnlineComponent } from './customer-reciept-online.component';

describe('CustomerRecieptOnlineComponent', () => {
  let component: CustomerRecieptOnlineComponent;
  let fixture: ComponentFixture<CustomerRecieptOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRecieptOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRecieptOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
