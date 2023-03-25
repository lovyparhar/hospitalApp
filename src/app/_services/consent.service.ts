import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  constructor(private globalService: GlobalService, private http: HttpClient) { }
  compose_consent(
    sourceHospitalId: string,
    destinationHospitalId: string,
    startDate: string,
    endDate: string
  ) {
    if (!this.globalService.currentCredentials) return;

    let postUrl = this.globalService.hospitalRootUrl + '/consent/sendConsent';
    let approved = false; // Should be always true.
    let patientId = this.globalService.currentCredentials.aadhar;

    return this.http.post(
      postUrl,
      {
        approved: approved,
        patientId: patientId,
        destinationHospitalId: destinationHospitalId,
        sourceHospitalId: sourceHospitalId,
        startTime: startDate,
        endTime: endDate,
      },
      { responseType: 'text' }
    );
  }
}
