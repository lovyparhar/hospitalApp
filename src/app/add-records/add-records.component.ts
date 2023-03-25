import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.scss'],
})
export class AddRecordsComponent implements OnInit {
  verfiyPatientForm!: FormGroup;
  @ViewChild('fform') verfiyPatientFormDirective!: any;
  state: any;

  formErrors: any = {
    aadhar: '',
  };

  validationMessages: any = {
    aadhar: {
      required: 'aadhar is required.',
    },
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.createForm();
  }
  createForm(): void {
    this.verfiyPatientForm = this.formBuilder.group({
      aadhar: ['', [Validators.required]],
    });

    this.verfiyPatientForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.verfiyPatientForm) {
      return;
    }

    const form = this.verfiyPatientForm;
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
  verifyPatient(){
    let aadhar = this.verfiyPatientForm.value.aadhar;
      let password = this.verfiyPatientForm.value.password;

      this.verfiyPatientFormDirective.resetForm();
      this.verfiyPatientForm.reset({
        aadhar: '',
        password: '',
      });

      this.authenticationService.verifyPatient(aadhar).subscribe(
        (data: any) => {
          this.postverfiyPatient();
          this.modalService.displayOkDialog('verfiyPatient Successful!', '');
        },
        (error: any) => {
          // console.log(error);
          this.modalService.displayOkDialog(
            'verfiyPatient Error',
            'The username/password is not valid.'
          );
        }
      );
  }
  postverfiyPatient(){}
  ngOnInit(): void {}
}
