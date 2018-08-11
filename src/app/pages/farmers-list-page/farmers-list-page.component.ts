import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { BehaviorSubject } from '../../../../node_modules/rxjs'
import { Farmer } from '../../models/core/farmer'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-farmers-list-page',
  templateUrl: './farmers-list-page.component.html',
  styleUrls: ['./farmers-list-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FarmersListPageComponent implements OnInit {
  // Farmers Listings
  displayedColumns = new BehaviorSubject<string[]>([
    'name',
    'sex',
    'phone_number',
    'is_absentee_farmer',
    'enterprise_engagements',
    'actions',
  ])

  farmers: Farmer[]
  farmers$
  selectedFarmer: Farmer
  farmersDataSource

  initialSelection = []
  allowMultiSelect = true
  selection

  constructor(
    public appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) {
    this.initialize()
    this.selection = new SelectionModel<Farmer>(
      this.allowMultiSelect,
      this.initialSelection
    )
  }

  ngOnInit() {
    const self = this

    this.appService.getFarmers().subscribe(
      function(data) {
        self.farmers = data

        // Doctionary with Key
        self.farmers$ = new BehaviorSubject<{ [id: string]: any }>(self.farmers)
        self.farmersDataSource = new BehaviorSubject<Farmer[]>([])

        self.farmers$.subscribe(changedFarmerData => {
          self.farmersDataSource.next(changedFarmerData)
        })

        console.log(self.farmers)
      },
      error => {
        console.log('Error getting farmers')
      }
    )
  }

  initialize() {
    this.appService.getState().topnavTitle = 'Farmers Directorate'
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.farmersDataSource.data.length
    return numSelected == numRows
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.farmersDataSource.data.forEach(row => this.selection.select(row))
  }

  applyFilter(filterValue: string) {
    this.farmersDataSource.filter = filterValue.trim().toLowerCase()
  }

  ViewProfile(farmer: Farmer) {
    alert(farmer.first_name)
  }
}
