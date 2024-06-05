import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMPRComponent } from './upload-mpr.component';

describe('UploadMPRComponent', () => {
  let component: UploadMPRComponent;
  let fixture: ComponentFixture<UploadMPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
