import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { AngularFireAuth } from 'angularfire2/auth'
import { AddEnterpriseDialogComponent } from '../../dialogs/add-enterprise-dialog/add-enterprise-dialog.component'
import { DeleteEnterpriseDialogComponent } from '../../dialogs/delete-enterprise-dialog/delete-enterprise-dialog.component'
import { EditEnterpriseDialogComponent } from '../../dialogs/edit-enterprise-dialog/edit-enterprise-dialog.component'
import { Enterprise } from '../../models/core/enterprise'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.css'],
})
export class EnterprisesComponent implements OnInit {
  columns = EnterpriseTableColumns
  displayedColumns = ['name', 'actions']
  enterprises: Enterprise[]
  selectedEnterprise: Enterprise
  enterpriseFormData: Enterprise
  first: number = 0
  multiSortMeta
  dataSource

  @ViewChild(MatPaginator)
  paginator: MatPaginator
  @ViewChild(MatSort)
  sort: MatSort

  constructor(
    public appService: AppService,
    public afAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {
    this.appService.getState().topNavTitle = 'Manage Entreprise Engagements'
  }

  ngOnInit() {
    let self = this
    this.appService.getEnterpriseEngagements().subscribe(data => {
      self.enterprises = data
      this.dataSource = new MatTableDataSource<Enterprise>(self.enterprises)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  openEditDialog(enterprise: Enterprise) {
    this.appService.selectedEnterprise = enterprise
    const dialogRef = this.dialog.open(EditEnterpriseDialogComponent)
  }

  openDeleteDialog(enterprise: Enterprise) {
    this.appService.selectedEnterprise = enterprise
    const dialogRef = this.dialog.open(DeleteEnterpriseDialogComponent)
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEnterpriseDialogComponent)
  }
}
export const EnterpriseTableColumns = [
  {
    field: 'name',
    header: 'Enterprise Name',
  },
  {
    field: 'id',
    header: 'Actions',
  },
]
