import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReading2Component } from './data-reading2.component';

describe('DataReading2Component', () => {
  let component: DataReading2Component;
  let fixture: ComponentFixture<DataReading2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataReading2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataReading2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
