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
        recordRequesterHospital:
          this.globalService.currentCredentials.hospitalName,
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
    let postUrl =
      this.globalService.hospitalRootUrl + '/doctor/doctor-add-record';
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
  recordbystaff(
    hospitalName: string,
    department: string,
    address: string,
    aadhar: string,
    doctor: string
  ) {
    let postUrl =
      this.globalService.hospitalRootUrl + '/staff/staff-add-record';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {
        hospitalName: hospitalName,
        department: department,
        aadhar: aadhar,
        address: address,
        doctorId: doctor,
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
  request_data(
    recordSenderHospital: string,
    department: string,
    aadhar: string
  ) {
    if (!this.globalService.currentCredentials) return;

    let postUrl = this.globalService.hospitalRootUrl + '/doctor/request-data';
    console.log(postUrl);

    let recordRequesterHospital =
      this.globalService.currentCredentials.hospitalName;

    return this.http.post<any>(postUrl, {
      patientId: aadhar,
      department: department,
      recordRequesterHospital: recordRequesterHospital,
      recordSenderHospital: recordSenderHospital,
      requestTime: '2023-03-03T23:24:00',
    });
  }
  fetchData() {
    let postUrl = this.globalService.hospitalRootUrl + '/doctor/getRecords';
    return this.http.get(postUrl);
  }
  clearRecords() {
    let postUrl = this.globalService.hospitalRootUrl + '/doctor/clear-records';
    return this.http.get(postUrl);
  }
  getPendingRecords() {
    let postUrl = this.globalService.hospitalRootUrl + '/doctor/get-pending-records';
    return this.http.get(postUrl);
  }
}
