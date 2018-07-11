import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(private appService: AppService) {
    this.appService.getState().pageFullScreen = false;
  }

  ngOnInit() {
  }

}
