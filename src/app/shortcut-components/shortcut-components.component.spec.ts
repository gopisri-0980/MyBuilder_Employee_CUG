import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutComponentsComponent } from './shortcut-components.component';

describe('ShortcutComponentsComponent', () => {
  let component: ShortcutComponentsComponent;
  let fixture: ComponentFixture<ShortcutComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
