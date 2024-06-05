import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuspenceentryListComponent } from './edit-suspenceentry-list.component';

describe('EditSuspenceentryListComponent', () => {
  let component: EditSuspenceentryListComponent;
  let fixture: ComponentFixture<EditSuspenceentryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuspenceentryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuspenceentryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
