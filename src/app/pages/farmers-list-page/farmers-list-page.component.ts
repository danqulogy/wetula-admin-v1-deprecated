import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnterpriseEngagement } from '../../models/assistive/enterprise_engagement';
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

  farmers: Farmer[]
  // private dataSource
  private farmers$: BehaviorSubject<Farmer[]> = null;
  // public observable for table
  farmersDataSource$: Observable<Farmer[]>;
  // Table Columns
  displayedColumns$ = new BehaviorSubject<string[]>(farmerTableColumnNames);



  temp: Farmer[]
  enterprises: Enterprise[]
  selectedFarmerEnterpriseEngagement: Enterprise
  selectedEnterpriseEngagements: EnterpriseEngagement[] = [];

  engagementLevels: any[]
  selectedEngagementLevel: number

  loadingIndicator = true
  farmerFormData: Farmer
  genders = ['Male', 'Female']
  ids = ['Ghana Card', 'Voters', 'NHIS']
  isAbsenteeFarmer = false

  personalFormGroup: FormGroup
  secondFormGroup: FormGroup

  activeIndex: number = 1

  constructor(
    public appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.appService.getState().topNavTitle = 'Farmers Directorate'
    this.engagementLevels = this.appService.getEnterpriseEngagementLevels()
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

    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('', Validators.required),
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
        self.farmers$ = new BehaviorSubject(self.farmers);

        self.farmersDataSource$ = self.farmers$.pipe(map(v => Object.values(v)));
        self.farmersDataSource$.subscribe(console.log);

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

  addEnterpriseEngagment() {
    console.log(this.selectedFarmerEnterpriseEngagement);

    // var ee: EnterpriseEngagement = {};
    // ee.engagement_level = this.selectedEngagementLevel;
    // ee.enterprise.name = "gfg";
  }

  updateFilter(event) { }

  proceedFromPersonalDetails() { }

  levelUp(farmerApplicantNumber: string) {
    const updatedFarmer: Farmer = this.farmers$.value[farmerApplicantNumber];
    if (updatedFarmer.number_of_lands) {
      updatedFarmer.number_of_lands++
    } else {
      updatedFarmer.number_of_lands = 0
    }

    const newFarmerData = { ...this.farmers.values[farmerApplicantNumber], [farmerApplicantNumber]: updatedFarmer }

    // Push into the stream
    this.farmers$.next(newFarmerData);
  }
}

export const farmerTableColumnNames = [
  'applicantNumber',
  'name',
  'gender',
  'gender',
  'absenteeFarmer',
  'phoneNumber',
  'email',
  'numberOfLands'
]