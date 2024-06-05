import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterestComponent } from './update-interest.component';

describe('UpdateInterestComponent', () => {
  let component: UpdateInterestComponent;
  let fixture: ComponentFixture<UpdateInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
