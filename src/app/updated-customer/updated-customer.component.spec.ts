import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedCustomerComponent } from './updated-customer.component';

describe('UpdatedCustomerComponent', () => {
  let component: UpdatedCustomerComponent;
  let fixture: ComponentFixture<UpdatedCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
