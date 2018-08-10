import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { Land } from '../../models/assistive/land'
import { AppService } from '../../services/app.service'

@Component({
  templateUrl: './add-land-dialog.component.html',
  styleUrls: ['./add-land-dialog.component.scss'],
})
export class AddLandDialogComponent implements OnInit {
  address: string
  sizeArea: string
  region: string
  district: string
  locality: string
  tenureshipModels: string[]

  regions: string[]
  tenureCodes: string[] = ['Lease', 'Rent', 'Hire', 'Owner']

  constructor(
    public appService: AppService,
    private dialogRef: MatDialogRef<AddLandDialogComponent>
  ) {
    this.regions = appService.getRegions()
    this.dialogRef.disableClose = true
  }

  ngOnInit(): void {}

  addEnterprise() {
    var land: Land = {
      address: this.address,
      size_area: this.sizeArea,
      region: this.region,
      district: this.district,
      locality: this.locality,
      applicable_tenure_codes: this.tenureshipModels,
    }
    this.appService.selectedLand = land
    this.dialogRef.close()
  }
  closeForm() {
    this.appService.selectedLand = null
    this.dialogRef.close()
  }
}
