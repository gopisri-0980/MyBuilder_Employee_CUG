import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeticketownerComponent } from './changeticketowner.component';

describe('ChangeticketownerComponent', () => {
  let component: ChangeticketownerComponent;
  let fixture: ComponentFixture<ChangeticketownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeticketownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeticketownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
