import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../_services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public globalservice: GlobalService,) { }

  ngOnInit(): void {
  }

}
