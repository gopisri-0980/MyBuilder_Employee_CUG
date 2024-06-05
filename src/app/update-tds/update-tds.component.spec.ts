import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTdsComponent } from './update-tds.component';

describe('UpdateTdsComponent', () => {
  let component: UpdateTdsComponent;
  let fixture: ComponentFixture<UpdateTdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
