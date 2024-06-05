import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMilestoneDueDatesComponent } from './update-milestone-due-dates.component';

describe('UpdateMilestoneDueDatesComponent', () => {
  let component: UpdateMilestoneDueDatesComponent;
  let fixture: ComponentFixture<UpdateMilestoneDueDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMilestoneDueDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMilestoneDueDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
