import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ConsentService } from '../_services/consent.service';
@Component({
  selector: 'app-request-patient-data',
  templateUrl: './request-patient-data.component.html',
  styleUrls: ['./request-patient-data.component.scss'],
})
export class RequestPatientDataComponent implements OnInit {
  getRecordsForm!: FormGroup;
  @ViewChild('fform') getRecordsFormDirective!: any;
  state: any;
  recordList: any;
  formErrors: any = {
    sourcehospital: '',
    department: '',
    aadhar: '',
  };

  validationMessages: any = {
    sourcehospital: {
      required: 'Source Hospital is required.',
    },
    department: {
      required: 'daterange is required.',
    },
    aadhar: {
      required: 'daterange is required.',
    },
  };
  sourceHospitals: any = ['H1', 'H2'];
  departments: any = [
    'Enter any department',
    'Radiology',
    'Urology',
    'Oncology',
    'Gynaecology',
    'Orthopaedics',
    'Cardiology',
    'Neurology',
  ];

  constructor(
    private router: Router,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private consentService: ConsentService
  ) {
    this.createForm();
  }
  createForm(): void {
    this.getRecordsForm = this.formBuilder.group({
      sourcehospital: ['', [Validators.required]],
      department: ['', [Validators.required]],
      aadhar: ['', [Validators.required]],
    });

    this.getRecordsForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.getRecordsForm) {
      return;
    }

    const form = this.getRecordsForm;
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

  getRecords() {
    this.consentService
      .request_data(
        this.getRecordsForm.value.sourcehospital,
        this.getRecordsForm.value.department,
        this.getRecordsForm.value.aadhar
      )
      ?.subscribe(
        (data) => {
          this.modalService.displayOkDialog(
            'Valid Approved Consent Found. Data Arriving soon.',
            'Please use refresh button below to get records '
          );
          this.getRecordsFormDirective.resetForm();
          this.getRecordsForm.reset({
            sourcehospital: '',
            department: '',
          });
        },
        (error) => {
          this.modalService.displayError(error);
          if (error.status === 404) {
            this.router.navigate(['/requestconsent']);
          }
        }
      );
  }
  fetchRecords() {
    this.consentService.fetchData()?.subscribe((data) => {
      console.log(data);
      this.recordList = data;
    });
  }
  clearRecords() {
    this.modalService
      .confirmationDialog(
        'Confirm',
        'Are you sure you want to clear all requested records?'
      )
      ?.subscribe((res) => {
        if (res === 'y') {
          this.consentService.clearRecords()?.subscribe((data) => {
            this.modalService.displayOkDialog('Records Cleared', '');
            // window.location.reload();
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          });
        }
      });
  }

  getEmergencyRecords() {
    let title: string = `<div class="alert">Confirm</div>`;
    let message: string = `Do you want to request data under emergency circumstances. This activity will be logged.`;

    this.modalService
      .confirmationDialog('Confirm', message)
      .subscribe((result) => {
        if (result == 'y') {
          this.consentService
            .request_emergency_data(
              this.getRecordsForm.value.sourcehospital,
              this.getRecordsForm.value.department,
              this.getRecordsForm.value.aadhar
            )
            ?.subscribe(
              (data) => {
                this.modalService.displayOkDialog(
                  'Data Arriving soon.',
                  'Please use refresh button below to get records '
                );
                this.getRecordsFormDirective.resetForm();
                this.getRecordsForm.reset({
                  sourcehospital: '',
                  department: '',
                });
              },
              (error) => {
                this.modalService.displayError(error);
                if (error.status === 404) {
                  this.router.navigate(['/requestconsent']);
                }
              }
            );
        }
      });
  }

  ngOnInit(): void {
    this.consentService.clearRecords().subscribe((data) => {});
  }
}
