import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOldReceiptComponent } from './generate-old-receipt.component';

describe('GenerateOldReceiptComponent', () => {
  let component: GenerateOldReceiptComponent;
  let fixture: ComponentFixture<GenerateOldReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOldReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOldReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
