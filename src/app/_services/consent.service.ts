import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  compose_consent(
    sourceHospitalId: string,
    department: string,
    aadhar: string,
    endDate: string
  ) {
    if (!this.globalService.currentCredentials) return;

    let postUrl =
      this.globalService.hospitalRootUrl + '/doctor/request-consent';

    return this.http.post(
      postUrl,
      {
        recordSenderHospital: sourceHospitalId,
        recordRequesterHospital: 'H1',
        patientId: aadhar,
        department: department,
        endTime: endDate,
      },
      { responseType: 'text' }
    );
  }
  adduser(
    firstname: string,
    lastname: string,
    aadhar: string,
    phoneNumber: string,
    dateOfBirth: string
  ) {
    let postUrl =
      this.globalService.demographicRootUrl + '/user-demographic/add-user';

    return this.http
      .post<any>(postUrl, {
        firstName: firstname,
        lastName: lastname,
        aadhar: aadhar,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
      })
      .pipe(
        map((credentials) => {
          return credentials;
        })
      );
  }
  record(
    hospitalName: string,
    department: string,
    diagnosis: string,
    address: string,
    prescription: string,
    aadhar: string
  ) {
    let postUrl = this.globalService.hospitalRootUrl + '/doctor/addrecord';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {
        hospitalName: hospitalName,
        department: department,
        aadhar: aadhar,
        address: address,
        diagnosis: diagnosis,
        prescription: prescription,
      })
      .pipe(
        map((credentials) => {
          return credentials;
        })
      );
  }
  getApprovedConsents() {
    let postUrl =
      this.globalService.hospitalRootUrl + '/doctor/getApprovedConsents';
    return this.http.get(postUrl);
  }
}
