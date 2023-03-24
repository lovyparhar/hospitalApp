import { Routes } from "@angular/router";
import { AddRecordsComponent } from "./add-records/add-records.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PendingRecordsComponent } from "./pending-records/pending-records.component";
import { RequestPatientDataComponent } from "./request-patient-data/request-patient-data.component";


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'pendingrecords', component: PendingRecordsComponent },
    { path: 'addrecords', component: AddRecordsComponent },
    { path: 'requestpatientdata', component: RequestPatientDataComponent },

    {path: 'dashboard', component: DashboardComponent}
  ];