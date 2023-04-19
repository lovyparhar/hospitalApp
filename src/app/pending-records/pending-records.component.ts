import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsentService } from '../_services/consent.service';
import { GlobalService } from '../_services/global.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-pending-records',
  templateUrl: './pending-records.component.html',
  styleUrls: ['./pending-records.component.scss'],
})
export class PendingRecordsComponent implements OnInit {
  pendingRecords: any;
  constructor(
    private router: Router,
    private modalService: ModalService,
    public globalService: GlobalService,
    private consentService: ConsentService
  ) {}

  completerecord(record: any) {
    if (this.globalService.currentCredentials) {
      this.router.navigate(['completerecord'], { state: record });
    }
  }

  ngOnInit(): void {
    if (this.globalService.currentCredentials) {
      this.consentService.getPendingRecords()?.subscribe((data: any) => {
        this.pendingRecords = data;
      });
    }
  }
}
