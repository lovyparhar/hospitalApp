import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
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

  register(
    firstname: string,
    lastname: string,
    email: string,
    aadhar: string,
    password: string
  ) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/register';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {
        firstname: firstname,
        lastname: lastname,
        aadhar: aadhar,
        password: password,
        email: email,
        dateOfBirth: "24/08/2000"
      })
      .pipe(
        map((credentials) => {
          console.log('The aadhar and password', aadhar, ' ', password);
          console.log('The Credentials is ', credentials);

          // login successful if there's a jwt token in the response
          return credentials;
        })
      );
  }

  hello() {
    let postUrl = this.globalService.hospitalRootUrl + '/hello';
    console.log(postUrl);

    return this.http
      .get<any>(postUrl);
  }

  change_password(new_password: string) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/change-password';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, {password: new_password });
  }

  reset_password(aadhar: string, mobile: string) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/send-otp';
    console.log(postUrl);

    return this.http
      .post<any>(postUrl, { aadhar: aadhar, phoneNumber: mobile });
  }

  verify_reset_otp(phoneNumber:string, otp:string, password:string, aadhar:string) {
    let postUrl = this.globalService.hospitalRootUrl + '/auth/verify-otp';
    console.log(postUrl);

    return this.http
      .patch<any>(postUrl, { phoneNumber:phoneNumber, otp:otp, password:password, aadhar:aadhar });
  }

  logout() {
    // return this.http.post((this.globalService.hospitalRootUrl + '/logout'), {});
  }
}
