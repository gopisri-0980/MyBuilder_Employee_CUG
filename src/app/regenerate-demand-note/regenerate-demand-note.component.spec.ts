import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegenerateDemandNoteComponent } from './regenerate-demand-note.component';

describe('RegenerateDemandNoteComponent', () => {
  let component: RegenerateDemandNoteComponent;
  let fixture: ComponentFixture<RegenerateDemandNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegenerateDemandNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegenerateDemandNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
