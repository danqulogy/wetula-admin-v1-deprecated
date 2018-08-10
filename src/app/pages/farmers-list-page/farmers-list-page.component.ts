import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Farmer } from '../../models/core/farmer';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-farmers-list-page',
  templateUrl: './farmers-list-page.component.html',
  styleUrls: ['./farmers-list-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FarmersListPageComponent implements OnInit {

  // Farmers Listings
  columns = farmerTableColumnNames
  farmers: Farmer[]


  loadingIndicator = true
  activeIndex: number = 1


  constructor(
    public appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) {
    this.initialize
    this.appService.getState().topNavTitle = 'Farmers Directorate'

  }

  ngOnInit() {
    const self = this

    this.appService.getFarmers().subscribe(
      function (data) {
        self.farmers = data

        console.log('Farmers ', data)
      },
      error => {
        console.log('Error getting farmers')
      }
    )
  }

  initialize() {
    this.appService.getState().topnavTitle = 'Farmers Directorate'
    setTimeout(() => {
      this.loadingIndicator = false
    }, 2500)
  }

  updateFilter(event) { }

}

export const farmerTableColumnNames = [
  {
    field: 'applicant_number',
    header: 'Applicant Number',
  },
  {
    field: 'first_name',
    header: 'First Name',
  },
  {
    field: 'sex',
    header: 'Gender',
  },
  {
    field: 'date_of_birth',
    header: 'Date of Birth',
  },
  {
    field: 'phone_number',
    header: 'Phone Number',
  },
  {
    field: 'email',
    header: 'Email',
  },
]
