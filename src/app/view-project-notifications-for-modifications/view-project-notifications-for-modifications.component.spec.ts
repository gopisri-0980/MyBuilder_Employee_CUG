import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectNotificationsForModificationsComponent } from './view-project-notifications-for-modifications.component';

describe('ViewProjectNotificationsForModificationsComponent', () => {
  let component: ViewProjectNotificationsForModificationsComponent;
  let fixture: ComponentFixture<ViewProjectNotificationsForModificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectNotificationsForModificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectNotificationsForModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
