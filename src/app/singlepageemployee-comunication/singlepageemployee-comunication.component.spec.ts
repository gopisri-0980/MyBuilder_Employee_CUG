import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageemployeeComunicationComponent } from './singlepageemployee-comunication.component';

describe('SinglepageemployeeComunicationComponent', () => {
  let component: SinglepageemployeeComunicationComponent;
  let fixture: ComponentFixture<SinglepageemployeeComunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepageemployeeComunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepageemployeeComunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
