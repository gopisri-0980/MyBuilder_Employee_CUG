import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompenyMailApproveComponent } from './compeny-mail-approve.component';

describe('CompenyMailApproveComponent', () => {
  let component: CompenyMailApproveComponent;
  let fixture: ComponentFixture<CompenyMailApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompenyMailApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompenyMailApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
