import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCrmReceiptOnlineViewComponent } from './modify-crm-receipt-online-view.component';

describe('ModifyCrmReceiptOnlineViewComponent', () => {
  let component: ModifyCrmReceiptOnlineViewComponent;
  let fixture: ComponentFixture<ModifyCrmReceiptOnlineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCrmReceiptOnlineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCrmReceiptOnlineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
