import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { AppService } from '../../services/app.service'

@Component({
  templateUrl: './dialog-theme.component.html',
  styleUrls: ['./dialog-theme.component.scss'],
})
export class DialogThemeComponent implements OnInit {
  collapseSidenavChecked: boolean
  isDarkTheme: boolean

  constructor(
    public appService: AppService,
    private dialogRef: MatDialogRef<DialogThemeComponent>
  ) {
    this.collapseSidenavChecked = appService.getState().sideNavCollapse
    this.isDarkTheme = this.appService.getState().darkMode
  }

  ngOnInit(): void {}

  toggleCollapseSidenav() {
    this.appService.getState().sideNavCollapse = !this.appService.getState()
      .sideNavCollapse
    this.collapseSidenavChecked = this.appService.getState().sideNavCollapse
    console.log(this.appService.getState().sideNavCollapse)
  }
  switchTheme() {
    this.appService.getState().darkMode = !this.appService.getState().darkMode
    this.isDarkTheme = this.appService.getState().darkMode
    console.log(this.appService.getState().darkMode)
    const body = document.getElementsByTagName('body')[0]
    body.className = ''
    if (this.appService.getState().darkMode) {
      body.className = 'dark'
      this.appService.getState().titleColor1 = 'fg-orange'
      this.appService.getState().titleColor2 = 'fg-lightOrange'
    } else {
      body.className = 'light'
      this.appService.getState().titleColor1 = 'fg-green'
      this.appService.getState().titleColor2 = 'fg-darkGreen'
    }
  }
}
