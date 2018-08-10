import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as _ from 'underscore';
import { EnterpriseEngagement } from '../../models/assistive/enterprise_engagement';
import { Land } from '../../models/assistive/land';
import { Enterprise } from '../../models/core/enterprise';
import { Farmer } from '../../models/core/farmer';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-farmers-list-page',
  templateUrl: './farmers-list-page.component.html',
  styleUrls: ['./farmers-list-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FarmersListPageComponent implements OnInit {
  @ViewChild(MatPaginator)
  landsPaginator: MatPaginator
  @ViewChild(MatSort)
  landsSort: MatSort

  // Farmers Listings
  columns = farmerTableColumnNames

  // Farmer registration
  farmers: Farmer[]
  enterprises: Enterprise[]
  enterpriseEngagementLevels: string[]

  selectedEnterprise: string
  selectedEngagementLevel: string
  currentEngagementList: EnterpriseEngagement[] = []

  landColumns = ['address', 'size_area', 'region', 'district', 'locality', 'tenureship_model', 'actions']
  currentLandList: Land[] = [
    {
      address: "Asaasebonano",
      size_area: "20 Acres",
      region: "Ashanti",
      district: "Ejura-Sekyedumase",
      locality: "Broadcasting"
    }
  ]
  selectedLand: Land
  landsDataSource

  loadingIndicator = true
  farmerFormData: Farmer
  genders = ['Male', 'Female']
  ids = ['Ghana Card', 'Voters', 'NHIS']
  isAbsenteeFarmer = false

  personalFormGroup: FormGroup
  enterprisesFormGroup: FormGroup

  activeIndex: number = 1

  constructor(
    public appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) {
    this.appService.getState().topNavTitle = 'Farmers Directorate'
    this.enterpriseEngagementLevels = this.appService.getEnterpriseEngagementLevels()
    this.landsDataSource = new MatTableDataSource<Land>(this.currentLandList);
    this.landsDataSource.paginator = this.landsPaginator;
    this.landsDataSource.sort = this.landsSort;
  }

  ngOnInit() {
    const self = this

    this.personalFormGroup = new FormGroup({
      firstNameCtrl: new FormControl('', Validators.required),
      surnameCtrl: new FormControl('', Validators.required),
      middleNameCtrl: new FormControl('', Validators.required),
      genderControl: new FormControl('', Validators.required),
      birthDateCtrl: new FormControl('', Validators.required),
      idsControl: new FormControl('', Validators.required),
      idNumberCtrl: new FormControl('', Validators.required),
      isAbsenteeCtrl: new FormControl('', Validators.required),
      phoneCtrl: new FormControl('', Validators.required),
      caretakerNameCtrl: new FormControl('', Validators.required),
      caretakerPhoneCtrl: new FormControl('', Validators.required),
      settlementCtrl: new FormControl('', Validators.required),
      streetCtrl: new FormControl('', Validators.required),
      districtCtrl: new FormControl('', Validators.required),
      houseCtrl: new FormControl('', Validators.required),
      regionCtrl: new FormControl('', Validators.required),
      countryCtrl: new FormControl('', Validators.required),
      postalOfficeCtrl: new FormControl('', Validators.required),
      postalTownCtrl: new FormControl('', Validators.required),
      postalStreetCtrl: new FormControl('', Validators.required),
    })

    this.enterprisesFormGroup = new FormGroup({
      // secondCtrl: new FormControl('', Validators.required),
    })

    // Observes IsAbsenteeFarmer Control
    this.personalFormGroup.controls['isAbsenteeCtrl'].valueChanges.subscribe(next => {
      document.getElementById('caretaker_info').hidden = !next
      this.isAbsenteeFarmer = next
    })

    this.appService.getEnterpriseEngagements().subscribe(data => {
      self.enterprises = data
    })

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

    this.farmerFormData = null

    setTimeout(() => {
      this.loadingIndicator = false
    }, 2500)
  }
  applyLandFilter(filterValue: string) {
    this.landsDataSource.filter = filterValue.trim().toLowerCase()
  }

  addEnterpriseEngagment() {
    var item = {
      enterprise_name: this.selectedEnterprise,
      engagement_level: this.selectedEngagementLevel,
    }
    var found = _.findWhere(this.currentEngagementList, {
      enterprise_name: this.selectedEnterprise,
    })
    if (found) {
      this.appService.openSnackBar('Already Added', 'Done')
    } else {
      this.currentEngagementList.push(item)
    }
  }

  removeEnterpriseEngagement(item: EnterpriseEngagement) {
    this.currentEngagementList = _.without(this.currentEngagementList, item)
    this.appService.openSnackBar('Removed', 'Done')
  }

  updateFilter(event) { }

  proceedFromPersonalDetails() { }
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
