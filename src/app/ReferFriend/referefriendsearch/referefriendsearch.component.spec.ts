import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferefriendsearchComponent } from './referefriendsearch.component';

describe('ReferefriendsearchComponent', () => {
  let component: ReferefriendsearchComponent;
  let fixture: ComponentFixture<ReferefriendsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferefriendsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferefriendsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
