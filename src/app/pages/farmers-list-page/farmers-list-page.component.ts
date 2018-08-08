import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
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
  temp: Farmer[]
  enterprises: Enterprise[]
  selectedFarmerEnterpriseEngagements: Enterprise;
  engagementLevels: any[];
  selectedEngagementLevel: number;


  loadingIndicator = true
  farmerFormData: Farmer
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  dataSource = new MatTableDataSource(ELEMENT_DATA)
  @ViewChild(MatSort)
  sort: MatSort
  genders = ['Male', 'Female']
  ids = ['Ghana Card', 'Voters', 'NHIS']
  isAbsenteeFarmer = false;

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
    this.engagementLevels = this.appService.getEnterpriseEngagementLevels();
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
    this.personalFormGroup.controls['isAbsenteeCtrl'].valueChanges
      .subscribe((next) => {
        document.getElementById("caretaker_info").hidden = !next;
        this.isAbsenteeFarmer = next;
      });

    this.appService.getEnterpriseEngagements().subscribe(
      (data) => {
        self.enterprises = data;
      }
    )

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

  updateFilter(event) { }

  proceedFromPersonalDetails() {

  }
}

export interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
]
