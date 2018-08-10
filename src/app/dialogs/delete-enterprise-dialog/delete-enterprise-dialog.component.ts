import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { AppService } from '../../services/app.service'

@Component({
  templateUrl: './delete-enterprise-dialog.component.html',
  styleUrls: ['./delete-enterprise-dialog.component.scss'],
})
export class DeleteEnterpriseDialogComponent implements OnInit {
  selectedEnterpriseName: string

  constructor(
    public appService: AppService,
    private dialogRef: MatDialogRef<DeleteEnterpriseDialogComponent>
  ) {
    this.selectedEnterpriseName = appService.selectedEnterprise.name
  }

  ngOnInit(): void {}

  deleteEnterprise() {
    var self = this
    this.appService.selectedEnterprise.name = this.selectedEnterpriseName
    this.appService.deleteEnterprise(this.appService.selectedEnterprise).then(value => {
      self.appService.openSnackBar(
        self.selectedEnterpriseName + ' is removed successfully.',
        'Done'
      )
    })
    this.close()
  }

  close() {
    this.dialogRef.close()
  }
}
