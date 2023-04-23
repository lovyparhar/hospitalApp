import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsentService } from '../_services/consent.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-consent-request-otp',
  templateUrl: './consent-request-otp.component.html',
  styleUrls: ['./consent-request-otp.component.scss']
})
export class ConsentRequestOTPComponent implements OnInit {

  otpForm!: FormGroup;
  patientId!: string;
  state: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private consentService: ConsentService, private modalService: ModalService) {
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });

    this.state = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.state);
    if(!this.state || !this.state['patientId']) {
      console.log(this.state);

      this.router.navigate(['/dashboard'])
      return;
    }

    this.patientId = this.state['patientId'];
  }

  ngOnInit() {
  
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      return;
    }

    const otp = this.otpForm.controls['otp'].value;

    this.consentService.verifyConsentRequestOTP(this.patientId, otp)
    .subscribe(
      () => {
        this.modalService.displayOkDialog('Consent Approved Successfully!', '');
        this.router.navigate(['/dashboard']);
      }
    )
  }

}
