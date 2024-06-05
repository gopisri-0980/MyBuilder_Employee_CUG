import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuspenceentryViewComponent } from './edit-suspenceentry-view.component';

describe('EditSuspenceentryViewComponent', () => {
  let component: EditSuspenceentryViewComponent;
  let fixture: ComponentFixture<EditSuspenceentryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuspenceentryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuspenceentryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
