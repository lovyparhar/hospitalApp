import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRecordComponent } from './complete-record.component';

describe('CompleteRecordComponent', () => {
  let component: CompleteRecordComponent;
  let fixture: ComponentFixture<CompleteRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
