import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Enterprise } from '../../models/core/enterprise';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: './add-enterprise-dialog.component.html',
  styleUrls: ['./add-enterprise-dialog.component.scss'],
})
export class AddEnterpriseDialogComponent implements OnInit {
  enterpriseName: string

  constructor(
    public appService: AppService,
    private dialogRef: MatDialogRef<AddEnterpriseDialogComponent>
  ) {
  }

  ngOnInit(): void { }

  addEnterprise() {
    var newEnterprise: Enterprise = { name: this.enterpriseName };
    this.appService.addEnterprise(newEnterprise).then((value) => {
      this.appService.openSnackBar(this.enterpriseName + ' has been added succesfully', 'Done')
    })
    this.close();

  }
  close() {
    this.dialogRef.close()
  }
}
