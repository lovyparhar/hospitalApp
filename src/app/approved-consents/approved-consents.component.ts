import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsentService } from '../_services/consent.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-approved-consents',
  templateUrl: './approved-consents.component.html',
  styleUrls: ['./approved-consents.component.scss'],
})
export class ApprovedConsentsComponent implements OnInit {
  approvedConsentList: any;

  constructor(
    private modalService: ModalService,
    public globalService: GlobalService,
    private consentService: ConsentService
  ) {}

  ngOnInit(): void {
    if (this.globalService.currentCredentials) {
      this.consentService.getApprovedConsents()?.subscribe((data: any) => {
        this.approvedConsentList = data;
        console.log(this.approvedConsentList);
      });
    }
  }
}
