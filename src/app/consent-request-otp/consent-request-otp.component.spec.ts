import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentRequestOTPComponent } from './consent-request-otp.component';

describe('ConsentRequestOTPComponent', () => {
  let component: ConsentRequestOTPComponent;
  let fixture: ComponentFixture<ConsentRequestOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentRequestOTPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentRequestOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
