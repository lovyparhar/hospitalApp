import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ConsentService } from '../_services/consent.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-request-consent',
  templateUrl: './request-consent.component.html',
  styleUrls: ['./request-consent.component.scss'],
})
export class RequestConsentComponent implements OnInit {
  consentForm!: FormGroup;
  @ViewChild('fform') consentFormDirective!: any;
  state: any;

  formErrors: any = {
    sourcehospital: '',
    department: '',
    aadhar: '',
    enddate: '',
  };

  validationMessages: any = {
    sourcehospital: {
      required: 'Source Hospital is required.',
    },
    department: {
      required: 'Source Hospital is required.',
    },
    aadhar: {
      required: 'aadhar is required.',
    },
    enddate: {
      required: 'daterange is required.',
    },
  };
  sourceHospitals: any = ['All hospitals', 'H1', 'H2', 'H3'];
  departments: any = ['All departments', 'Radiology', 'Urology', 'Oncology'];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private consentService: ConsentService,
    private datePipe: DatePipe
  ) {
    this.createForm();
  }
  createForm(): void {
    this.consentForm = this.formBuilder.group({
      sourcehospital: ['', [Validators.required]],
      department: ['', [Validators.required]],
      aadhar: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      noPatientApp: [false],
      useGuardianOTP: [false],
    });

    this.consentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.consentForm) {
      return;
    }

    const form = this.consentForm;
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

  composeConsent() {
    let myDate: Date = this.consentForm.value.enddate;
    const enddate = this.datePipe.transform(
      myDate,
      'yyyy-MM-ddTHH:mm:ss'
    ) as string;

    let noPatientApp: boolean = this.consentForm.value.noPatientApp;
    let useGuardianOTP: boolean = this.consentForm.value.useGuardianOTP;

    if (useGuardianOTP) {
      this.consentService
        .getConsentRequestGuardianOTP(
          this.consentForm.value.sourcehospital,
          this.consentForm.value.department,
          this.consentForm.value.aadhar,
          enddate
        )
        ?.subscribe((data) => {
          this.router.navigate(['/consent-request-otp'], {
            state: { patientId: this.consentForm.value.aadhar },
          });
        });
    } else if (noPatientApp) {
      this.consentService
        .getConsentRequestPatientOTP(
          this.consentForm.value.sourcehospital,
          this.consentForm.value.department,
          this.consentForm.value.aadhar,
          enddate
        )
        ?.subscribe((data) => {
          this.router.navigate(['/consent-request-otp'], {
            state: { patientId: this.consentForm.value.aadhar },
          });
        });
    } else {
      this.consentService
        .checkActiveConsent(
          this.consentForm.value.sourcehospital,
          this.consentForm.value.department,
          this.consentForm.value.aadhar
        )
        ?.subscribe(
          (data) => {
            console.log(data);
            this.modalService
              .confirmationDialog(
                'Existing Consent Found',
                'Do you want to update the end date from [' +
                  data[0].endTime.slice(0, 10) +
                  ' ' +
                  data[0].endTime.slice(12) +
                  '] to [' +
                  enddate.slice(0, 10) +
                  ' ' +
                  enddate.slice(12) +
                  '] and request consent again? '
              )
              .subscribe((res) => {
                if (res === 'y') {
                  this.consentService
                    .compose_consent(
                      this.consentForm.value.sourcehospital,
                      this.consentForm.value.department,
                      this.consentForm.value.aadhar,
                      enddate
                    )
                    ?.subscribe((data) => {
                      this.modalService.displayOkDialog(
                        'Consent Created Successfully!',
                        ''
                      );
                      this.router.navigate(['/dashboard']);
                    });
                }
              });
          },
          (err: any) => {
            this.consentService
              .compose_consent(
                this.consentForm.value.sourcehospital,
                this.consentForm.value.department,
                this.consentForm.value.aadhar,
                enddate
              )
              ?.subscribe((data) => {
                this.modalService.displayOkDialog(
                  'Consent Created Successfully!',
                  ''
                );
                this.router.navigate(['/dashboard']);
              });
          }
        );
    }
  }

  ngOnInit(): void {}
}
