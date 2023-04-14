import { Routes } from '@angular/router';
import { AddRecordsComponent } from './add-records/add-records.component';
import { ApprovedConsentsComponent } from './approved-consents/approved-consents.component';
import { CreatePatientRecordComponent } from './create-patient-record/create-patient-record.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PendingRecordsComponent } from './pending-records/pending-records.component';
import { RequestConsentComponent } from './request-consent/request-consent.component';
import { RequestPatientDataComponent } from './request-patient-data/request-patient-data.component';
import { AuthGuard } from './auth.gaurd';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'pendingrecords', component: PendingRecordsComponent, canActivate: [AuthGuard] },
  { path: 'addrecords', component: AddRecordsComponent, canActivate: [AuthGuard] },
  { path: 'requestpatientdata', component: RequestPatientDataComponent, canActivate: [AuthGuard] },
  { path: 'approvedconsents', component: ApprovedConsentsComponent, canActivate: [AuthGuard] },
  { path: 'requestconsent', component: RequestConsentComponent, canActivate: [AuthGuard] },
  { path: 'createpatient', component: CreatePatientComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'createpatientrecord', component: CreatePatientRecordComponent, canActivate: [AuthGuard]},

];
