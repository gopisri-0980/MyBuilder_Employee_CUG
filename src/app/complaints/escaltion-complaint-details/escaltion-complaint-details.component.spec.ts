import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscaltionComplaintDetailsComponent } from './escaltion-complaint-details.component';

describe('EscaltionComplaintDetailsComponent', () => {
  let component: EscaltionComplaintDetailsComponent;
  let fixture: ComponentFixture<EscaltionComplaintDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscaltionComplaintDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaltionComplaintDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
