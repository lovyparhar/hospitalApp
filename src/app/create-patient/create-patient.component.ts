import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ConsentService } from '../_services/consent.service';
@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
})
export class CreatePatientComponent implements OnInit {
  registerForm!: FormGroup;
  @ViewChild('fform') registerFormDirective!: any;
  aadhar: any;
  formErrors: any = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
  };

  validationMessages: any = {
    firstName: {
      required: 'First name is required.',
    },
    lastName: {
      required: 'Last Name is required.',
    },
    phoneNumber: {
      required: 'phoneNumber is required.',
    },
  };
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private consentservice: ConsentService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private datePipe: DatePipe
  ) {
    this.createForm();
    this.aadhar = this.router.getCurrentNavigation()?.extras.state;
  }
  createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      dob: ['', [Validators.required]],
    });

    this.registerForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }

    const form = this.registerForm;
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

  register() {
    let firstName = this.registerForm.value.firstName;
    let lastName = this.registerForm.value.lastName;
    let aadhar = this.aadhar;
    let dob = this.registerForm.value.dob;
    let myDate: Date = dob;
    const isodob = this.datePipe.transform(myDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ')?.slice(0,19) as string;
    let phoneNumber = this.registerForm.value.phoneNumber;

    this.registerFormDirective.resetForm();
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      dob: '',
    });

    this.consentservice
      .adduser(firstName, lastName, aadhar, phoneNumber, isodob)
      .subscribe(
        (data: any) => {
          this.postregister(data);
          this.modalService.displayOkDialog('register Successful!', '');
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  postregister(data: any) {
    this.router.navigate(['createpatientrecord'], { state: data });
  }
  ngOnInit(): void {}
}
