import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConsentComponent } from './request-consent.component';

describe('RequestConsentComponent', () => {
  let component: RequestConsentComponent;
  let fixture: ComponentFixture<RequestConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
