import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderCreationComponent } from './lender-creation.component';

describe('LenderCreationComponent', () => {
  let component: LenderCreationComponent;
  let fixture: ComponentFixture<LenderCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
