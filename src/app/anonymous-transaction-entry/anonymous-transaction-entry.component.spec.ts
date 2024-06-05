import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousTransactionEntryComponent } from './anonymous-transaction-entry.component';

describe('AnonymousTransactionEntryComponent', () => {
  let component: AnonymousTransactionEntryComponent;
  let fixture: ComponentFixture<AnonymousTransactionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousTransactionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousTransactionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
