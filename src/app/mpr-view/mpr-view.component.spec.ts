import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPRViewComponent } from './mpr-view.component';

describe('MPRViewComponent', () => {
  let component: MPRViewComponent;
  let fixture: ComponentFixture<MPRViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPRViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPRViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
