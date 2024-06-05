import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAndSiteAccessMastersComponent } from './module-and-site-access-masters.component';

describe('ModuleAndSiteAccessMastersComponent', () => {
  let component: ModuleAndSiteAccessMastersComponent;
  let fixture: ComponentFixture<ModuleAndSiteAccessMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleAndSiteAccessMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleAndSiteAccessMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
