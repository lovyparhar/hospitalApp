import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  login(aadhar: string, password: string) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/login';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, { aadhar: aadhar, password: password })
      .pipe(
        map((credentials) => {
          console.log('The Username and password', aadhar, ' ', password);
          console.log('The Credentials is ', credentials);

          // login successful if there's a jwt token in the response
          if (credentials) {
            this.globalService.saveCredentials(JSON.stringify(credentials));
          }

          return credentials;
        })
      );
  }

  change_password(new_password: string) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/change-password';
    console.log(postUrl);

    return this.http.post<any>(postUrl, { password: new_password });
  }

  reset_password(aadhar: string, mobile: string) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/send-otp';
    console.log(postUrl);

    return this.http.post<any>(postUrl, {
      aadhar: aadhar,
      phoneNumber: mobile,
    });
  }

  verify_reset_otp(
    phoneNumber: string,
    otp: string,
    password: string,
    aadhar: string
  ) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/verify-otp';
    console.log(postUrl);

    return this.http.patch<any>(postUrl, {
      phoneNumber: phoneNumber,
      otp: otp,
      password: password,
      aadhar: aadhar,
    });
  }
  verifyPatient(aadhar: string) {
    let postUrl =
      this.globalService.hospitalRootUrl + '/auth/get-user-demographic';
    console.log(postUrl, aadhar);

    return this.http.post<any>(postUrl, { aadhar: aadhar });
  }
  logout() {
    // return this.http.post((this.globalService.hospitalRootUrl + '/logout'), {});
  }
}
