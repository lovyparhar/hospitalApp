import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPatientDataComponent } from './request-patient-data.component';

describe('RequestPatientDataComponent', () => {
  let component: RequestPatientDataComponent;
  let fixture: ComponentFixture<RequestPatientDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPatientDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPatientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
