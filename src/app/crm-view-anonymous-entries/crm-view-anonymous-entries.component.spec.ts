import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmViewAnonymousEntriesComponent } from './crm-view-anonymous-entries.component';

describe('CrmViewAnonymousEntriesComponent', () => {
  let component: CrmViewAnonymousEntriesComponent;
  let fixture: ComponentFixture<CrmViewAnonymousEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmViewAnonymousEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmViewAnonymousEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
