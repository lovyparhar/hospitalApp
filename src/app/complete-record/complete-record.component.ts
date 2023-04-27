import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ConsentService } from '../_services/consent.service';
@Component({
  selector: 'app-complete-record',
  templateUrl: './complete-record.component.html',
  styleUrls: ['./complete-record.component.scss'],
})
export class CompleteRecordComponent implements OnInit {
  state: any;
  recordForm!: FormGroup;
  @ViewChild('fform') recordFormDirective!: any;

  formErrors: any = {
    diagnosis: '',
    prescription: '',
  };

  validationMessages: any = {
    diagnosis: {
      required: 'diagnosis is required.',
    },
    prescription: {
      required: 'diagnosis is required.',
    },
  };
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private consentservice: ConsentService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.createForm();
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }
  createForm(): void {
    this.recordForm = this.formBuilder.group({
      department: ['', [Validators.required]],
      address: ['', [Validators.required]],
      diagnosis: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      prescription: ['', [Validators.required]],
    });

    this.recordForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.recordForm) {
      return;
    }

    const form = this.recordForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  createRecord() {
    let hospitalName = this.globalService.currentCredentials.hospitalName;
    let department = this.state.department;
    let address = this.state.address;
    let diagnosis = this.recordForm.value.diagnosis;
    let prescription = this.recordForm.value.prescription;
    let aadhar = this.state.aadhar;
    let firstName = this.state.patientFirstName;
    let lastName = this.state.patientLastName;

    this.recordFormDirective.resetForm();
    this.recordForm.reset({
      diagnosis: '',
      prescription: '',
    });
    this.consentservice
      .update_record(
        hospitalName,
        department,
        diagnosis,
        address,
        prescription,
        aadhar,
        firstName,
        lastName
      )
      .subscribe(
        (data: any) => {
          this.modalService.displayOkDialog('Record Created Successfully!', '');
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.modalService.displayError(error);
        }
      );
  }
  ngOnInit(): void {}
}
