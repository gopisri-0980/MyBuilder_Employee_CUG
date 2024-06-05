import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsacationComplaintsComponent } from './esacation-complaints.component';

describe('EsacationComplaintsComponent', () => {
  let component: EsacationComplaintsComponent;
  let fixture: ComponentFixture<EsacationComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsacationComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsacationComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
