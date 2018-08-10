import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: './edit-enterprise-dialog.component.html',
  styleUrls: ['./edit-enterprise-dialog.component.scss'],
})
export class EditEnterpriseDialogComponent implements OnInit {
  selectedEnterpriseName: string

  constructor(
    public appService: AppService,
    private dialogRef: MatDialogRef<EditEnterpriseDialogComponent>
  ) {
    this.selectedEnterpriseName = appService.selectedEnterprise.name
  }

  ngOnInit(): void { }

  updateEnterprise() {
    this.appService.selectedEnterprise.name = this.selectedEnterpriseName
    this.appService.updateEnterpriseDetail(this.appService.selectedEnterprise)
    this.appService.openSnackBar('Enterprise name updated succesfully', 'Done')
    this.close()
  }
  close() {
    this.dialogRef.close()
  }
}
