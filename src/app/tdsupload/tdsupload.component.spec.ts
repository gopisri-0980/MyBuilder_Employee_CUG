import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TDSUploadComponent } from './tdsupload.component';

describe('TDSUploadComponent', () => {
  let component: TDSUploadComponent;
  let fixture: ComponentFixture<TDSUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TDSUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TDSUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
