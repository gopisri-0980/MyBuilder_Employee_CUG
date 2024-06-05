import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAndUnregisterListComponent } from './register-and-unregister-list.component';

describe('RegisterAndUnregisterListComponent', () => {
  let component: RegisterAndUnregisterListComponent;
  let fixture: ComponentFixture<RegisterAndUnregisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAndUnregisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAndUnregisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
