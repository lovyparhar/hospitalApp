import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ConsentService } from '../_services/consent.service';
@Component({
  selector: 'app-create-patient-record',
  templateUrl: './create-patient-record.component.html',
  styleUrls: ['./create-patient-record.component.scss'],
})
export class CreatePatientRecordComponent implements OnInit {
  state: any;
  recordForm!: FormGroup;
  @ViewChild('fform') recordFormDirective!: any;

  formErrors: any = {
    department: '',
    address: '',
    diagnosis: '',
    doctor: '',
    prescription: '',
  };

  validationMessages: any = {
    department: {
      required: 'Last Name is required.',
    },
    address: {
      required: 'address is required.',
    },
    diagnosis: {
      required: 'diagnosis is required.',
    },
    prescription: {
      required: 'diagnosis is required.',
    },
  };
  departments: any = ['All departments', 'Radiology', 'Urology', 'Oncology'];
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private consentservice: ConsentService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.createForm();
    this.state = this.router.getCurrentNavigation()?.extras.state; // data and role.
    console.log(this.state);
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

  record() {
    let hospitalName = this.globalService.currentCredentials.hospitalName;
    let department = this.recordForm.value.department;
    let address = this.recordForm.value.address;
    let diagnosis = this.recordForm.value.diagnosis;
    let prescription = this.recordForm.value.prescription;
    let doctor = this.recordForm.value.doctor;
    let aadhar = this.state.data.aadhar;

    this.recordFormDirective.resetForm();
    this.recordForm.reset({
      department: '',
      address: '',
      diagnosis: '',
      prescription: '',
      doctor: '',
    });

    if (this.state.role.state === 'DOCTOR') {
      this.consentservice
        .record(
          hospitalName,
          department,
          diagnosis,
          address,
          prescription,
          aadhar
        )
        .subscribe(
          (data: any) => {
            this.modalService.displayOkDialog(
              'Record Created Successfully!',
              ''
            );
            this.router.navigate(['/dashboard']);
          },
          (error: any) => {
            this.modalService.displayError(error);
          }
        );
    }
    else
    {
      this.consentservice
      .recordbystaff(
        hospitalName,
        department,
        address,
        aadhar,
        doctor,
      )
      .subscribe(
        (data: any) => {
          this.modalService.displayOkDialog('Record Created Successfully!', 'Forwarded to DoctorID : ' + doctor);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.modalService.displayError(error);
        }
      );
    }
  }

  ngOnInit(): void {}
}
