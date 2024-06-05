import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRegisteredOrNotComponent } from './app-registered-or-not.component';

describe('AppRegisteredOrNotComponent', () => {
  let component: AppRegisteredOrNotComponent;
  let fixture: ComponentFixture<AppRegisteredOrNotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRegisteredOrNotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRegisteredOrNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
