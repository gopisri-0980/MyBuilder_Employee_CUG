import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonCustomerComponent } from './horizon-customer.component';

describe('HorizonCustomerComponent', () => {
  let component: HorizonCustomerComponent;
  let fixture: ComponentFixture<HorizonCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
