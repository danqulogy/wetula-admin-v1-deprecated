import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import * as _ from 'underscore'
import { AddLandDialogComponent } from '../../dialogs/add-land-dialog/add-land-dialog.component'
import { DeleteLandDialogComponent } from '../../dialogs/delete-land-dialog/delete-land-dialog.component'
import { EnterpriseEngagement } from '../../models/assistive/enterprise_engagement'
import { Land } from '../../models/assistive/land'
import { Enterprise } from '../../models/core/enterprise'
import { Farmer } from '../../models/core/farmer'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-farmer-registration',
  templateUrl: './farmer-registration.component.html',
  styleUrls: ['./farmer-registration.component.css'],
})
export class FarmerRegistrationComponent implements OnInit {
  @ViewChild(MatPaginator)
  landsPaginator: MatPaginator
  @ViewChild(MatSort)
  landsSort: MatSort
  farmers: Farmer[]
  enterprises: Enterprise[]
  enterpriseEngagementLevels: string[]

  selectedEnterprise: string
  selectedEngagementLevel: string
  currentEngagementList: EnterpriseEngagement[] = []

  landColumns = [
    'address',
    'size_area',
    'region',
    'district',
    'locality',
    'tenureship_model',
    'actions',
  ]
  currentLandList: Land[] = []
  selectedLand: Land
  landsDataSource

  genders = ['Male', 'Female']
  ids = ['Ghana Card', 'Voters', 'NHIS']
  isAbsenteeFarmer = false

  personalFormGroup: FormGroup
  enterprisesFormGroup: FormGroup
  bankInfoForm: FormGroup
  regions: string[]

  accountTypes: string[]
  farmerFormData: Farmer = {
    surname: '',
    first_name: '',
    middle_name: '',
    sex: '',
    date_of_birth: '',
    id_card: { type: '', number: '' },
    is_absentee_farmer: false,
    phone_number: '',
    email: '',
    caretaker: { name: '', phone_number: '' },
    enterprise_engagement: [],
    land_parcels: [],
    physical_address: {
      country: 'string',
      district_province: '',
      house_number: '',
      region: '',
      road_street_trace_address: '',
      town_village_settlement: '',
    },
    postal_address: {
      postal_office_box: '',
      street_road_trace_sentence: '',
      town_village_settlement: '',
    },
    bank_info: {
      account_name: '',
      account_number: '',
      account_type: '',
      bank_name: '',
      bank_phone_number: '',
      bic_swift_code: '',
      branch_address: '',
      branch_name: '',
    },
  }
  isSubmitted = false

  constructor(
    public appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) {
    this.initialize
    this.appService.getState().topNavTitle = 'Farmers Directorate'
    this.enterpriseEngagementLevels = this.appService.getEnterpriseEngagementLevels()
    this.landsDataSource = new MatTableDataSource<Land>(this.currentLandList)
    this.landsDataSource.paginator = this.landsPaginator
    this.landsDataSource.sort = this.landsSort
    this.accountTypes = appService.getBankAccountTypes()
    this.regions = appService.getRegions()
  }

  ngOnInit() {
    const self = this

    this.personalFormGroup = new FormGroup({
      firstNameCtrl: new FormControl('', Validators.required),
      surnameCtrl: new FormControl('', Validators.required),
      middleNameCtrl: new FormControl(''),
      genderControl: new FormControl('', Validators.required),
      birthDateCtrl: new FormControl('', Validators.required),
      idsControl: new FormControl('', Validators.required),
      idNumberCtrl: new FormControl('', Validators.required),
      isAbsenteeCtrl: new FormControl('', Validators.required),
      phoneCtrl: new FormControl('', Validators.required),
      caretakerNameCtrl: new FormControl(''),
      caretakerPhoneCtrl: new FormControl(''),
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

    this.bankInfoForm = new FormGroup({
      accountTypeCtrl: new FormControl('', Validators.required),
      accountNameCtrl: new FormControl('', Validators.required),
      accountNumberCtrl: new FormControl('', Validators.required),
      bicSwiftCodeCtrl: new FormControl('', Validators.required),
      bankNameCtrl: new FormControl('', Validators.required),
      branchNameCtrl: new FormControl('', Validators.required),
      branchAddressCtrl: new FormControl('', Validators.required),
      bankPhoneCtrl: new FormControl('', Validators.required),
    })

    // Observes IsAbsenteeFarmer Control
    this.personalFormGroup.controls['isAbsenteeCtrl'].valueChanges.subscribe(next => {
      var ct = document.getElementById('caretaker_info')
      if (ct != null || ct != undefined) {
        // ct.hidden = !next
        this.isAbsenteeFarmer = !next
      }
    })

    this.personalFormGroup.controls['countryCtrl'].setValue('Ghana')

    this.personalFormGroup.controls['isAbsenteeCtrl'].setValue(true)

    this.appService.getEnterpriseEngagements().subscribe(data => {
      self.enterprises = data
    })

    this.appService.getFarmers().subscribe(
      function(data) {
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
  }
  applyLandFilter(filterValue: string) {
    this.landsDataSource.filter = filterValue.trim().toLowerCase()
  }

  openDeleteLandDialog(land: Land) {
    var self = this

    this.appService.selectedLand = land
    const dialogRef = this.dialog.open(DeleteLandDialogComponent)
    dialogRef.afterClosed().subscribe(() => {
      if (self.appService.landRemovalToken) {
        self.currentLandList = _.without(this.currentLandList, land)
        this.appService.openSnackBar('Removed', 'Done')

        self.landsDataSource = new MatTableDataSource<Land>(self.currentLandList)
        self.landsDataSource.paginator = self.landsPaginator
        self.landsDataSource.sort = self.landsSort
        console.log(self.appService.selectedLand)
        console.log(self.currentLandList.length)
      }
    })
  }

  openAddLandDialog() {
    var self = this
    const dialogRef = this.dialog.open(AddLandDialogComponent)
    dialogRef.afterClosed().subscribe(() => {
      if (self.appService.selectedLand != null) {
        self.currentLandList.push(self.appService.selectedLand)
        self.enterpriseEngagementLevels = self.appService.getEnterpriseEngagementLevels()
        self.landsDataSource = new MatTableDataSource<Land>(self.currentLandList)
        self.landsDataSource.paginator = self.landsPaginator
        self.landsDataSource.sort = self.landsSort
        console.log(self.appService.selectedLand)
        console.log(self.currentLandList.length)
      }
    })
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

  proceedFromPersonalDetails() {
    this.farmerFormData.first_name = this.personalFormGroup.controls[
      'firstNameCtrl'
    ].value
    this.farmerFormData.surname = this.personalFormGroup.controls['surnameCtrl'].value
    this.farmerFormData.middle_name = this.personalFormGroup.controls[
      'middleNameCtrl'
    ].value
    this.farmerFormData.sex = this.personalFormGroup.controls['genderControl'].value
    this.farmerFormData.date_of_birth = this.personalFormGroup.controls[
      'birthDateCtrl'
    ].value
    this.farmerFormData.id_card.type = this.personalFormGroup.controls['idsControl'].value
    this.farmerFormData.id_card.number = this.personalFormGroup.controls[
      'idNumberCtrl'
    ].value
    this.farmerFormData.is_absentee_farmer = this.personalFormGroup.controls[
      'isAbsenteeCtrl'
    ].value
    this.farmerFormData.caretaker.name = this.personalFormGroup.controls[
      'caretakerNameCtrl'
    ].value
    this.farmerFormData.caretaker.phone_number = this.personalFormGroup.controls[
      'caretakerPhoneCtrl'
    ].value
    this.farmerFormData.physical_address.town_village_settlement = this.personalFormGroup.controls[
      'settlementCtrl'
    ].value
    this.farmerFormData.physical_address.road_street_trace_address = this.personalFormGroup.controls[
      'streetCtrl'
    ].value
    this.farmerFormData.physical_address.district_province = this.personalFormGroup.controls[
      'districtCtrl'
    ].value
    this.farmerFormData.physical_address.house_number = this.personalFormGroup.controls[
      'houseCtrl'
    ].value
    this.farmerFormData.physical_address.region = this.personalFormGroup.controls[
      'regionCtrl'
    ].value
    this.farmerFormData.physical_address.country = this.personalFormGroup.controls[
      'countryCtrl'
    ].value
    this.farmerFormData.postal_address.postal_office_box = this.personalFormGroup.controls[
      'postalOfficeCtrl'
    ].value
    this.farmerFormData.postal_address.town_village_settlement = this.personalFormGroup.controls[
      'postalTownCtrl'
    ].value
    this.farmerFormData.postal_address.street_road_trace_sentence = this.personalFormGroup.controls[
      'postalStreetCtrl'
    ].value

    this.farmerFormData.phone_number = this.personalFormGroup.controls['phoneCtrl'].value

    console.log(this.farmerFormData)
  }

  proceedFromEnterpriseDetails() {
    this.farmerFormData.enterprise_engagement = this.currentEngagementList
    console.log(this.farmerFormData)
  }

  proceedFromLandDetails() {
    this.farmerFormData.land_parcels = this.currentLandList
    console.log(this.farmerFormData)
  }

  saveFarmer() {
    var self = this
    if (this.bankInfoForm.invalid) {
      this.appService.openSnackBar(
        'Complete bank details. All fields marked with asteriks * are required',
        'Done'
      )
    } else {
      this.farmerFormData.bank_info.account_type = this.bankInfoForm.controls[
        'accountTypeCtrl'
      ].value
      this.farmerFormData.bank_info.account_name = this.bankInfoForm.controls[
        'accountNameCtrl'
      ].value
      this.farmerFormData.bank_info.account_number = this.bankInfoForm.controls[
        'accountNumberCtrl'
      ].value
      this.farmerFormData.bank_info.bic_swift_code = this.bankInfoForm.controls[
        'bicSwiftCodeCtrl'
      ].value
      this.farmerFormData.bank_info.bank_name = this.bankInfoForm.controls[
        'bankNameCtrl'
      ].value
      this.farmerFormData.bank_info.branch_name = this.bankInfoForm.controls[
        'branchNameCtrl'
      ].value
      this.farmerFormData.bank_info.branch_address = this.bankInfoForm.controls[
        'branchAddressCtrl'
      ].value
      this.farmerFormData.bank_info.bank_phone_number = this.bankInfoForm.controls[
        'bankPhoneCtrl'
      ].value
      console.log(this.farmerFormData)
      this.isSubmitted = true
      this.appService.addFarmer(this.farmerFormData).then(value => {
        self.appService.openSnackBar('Farmer registered successfully', 'Done')
        self.isSubmitted = false
      })
      this.router.navigateByUrl('farmers')
    }
  }
}
