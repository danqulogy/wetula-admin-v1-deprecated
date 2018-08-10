import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: './delete-land-dialog.component.html',
  styleUrls: ['./delete-land-dialog.component.scss'],
})
export class DeleteLandDialogComponent implements OnInit {
  selectedEnterpriseName: string

  constructor(
    public appService: AppService,
    private dialogRef: MatDialogRef<DeleteLandDialogComponent>) {

  }

  ngOnInit(): void { }

  deleteEnterprise() {
    var self = this
    this.appService.landRemovalToken = true;
    this.dialogRef.close();
  }

  close() {
    this.appService.landRemovalToken = false;
    this.dialogRef.close()
  }
}
