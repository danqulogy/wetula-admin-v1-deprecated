///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core'
import { MatDialog, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { DialogThemeComponent } from '../../dialogs/theme-dialog/dialog-theme.component'
import { AppService } from '../../services/app.service'
import { MenuMock } from '../../values/menu'

declare var $: any

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appService: AppService
  router: Router
  dialog: MatDialog
  snackBar: MatSnackBar
  afAuth: AngularFireAuth

  mainMenu = MenuMock.root
  searchItems = []
  searchItem: any
  showTopnavSearch: boolean
  activeSubMenuName: string
  date: Date
  snackBarRef: any

  constructor(
    private _appService: AppService,
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.appService = _appService
    this.router = _router
    this.dialog = _dialog
    this.snackBar = _snackBar
    this.afAuth = _afAuth

    this.date = new Date()
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit() {
    const self = this
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const bodyWidth: number = document.body.clientWidth
    if (bodyWidth > 960) {
      if (this.appService.getState().sideNavMode !== 'side') {
        this.appService.getState().sideNavOpen = true
      }

      this.appService.getState().sideNavMode = 'side'
    } else if (bodyWidth <= 960 && bodyWidth > 600) {
      this.appService.getState().sideNavMode = 'push'
      this.appService.getState().sideNavOpen = false
    } else if (bodyWidth <= 600) {
      this.appService.getState().sideNavMode = 'over'
      this.appService.getState().sideNavOpen = false
      this.appService.getState().topNavSubTitle = 'Assistant'
    }
  }

  resizeSidenav() {
    if (this.appService.getState().sideNavMode === 'side') {
      const resizeEvent = document.createEvent('HTMLEvents')
      resizeEvent.initEvent('resize', true, true)
      document.dispatchEvent(resizeEvent)
    }
  }

  toggleTopnavSearch() {
    if (this.appService.getState().sideNavMode === 'over') {
      this.showTopnavSearch = false
    } else {
      this.showTopnavSearch = !this.showTopnavSearch
    }
  }

  toggleFullscreen() {
    $(document).toggleFullScreen()
  }
  toggleSidenavCollapse() {
    if (this.appService.getState().sideNavCollapse) {
      this.resizeSidenav()
    }
  }
  toggleSidenav() {
    this.appService.getState().sideNavOpen = !this.appService.getState().sideNavOpen
    this.resizeSidenav()
    console.log('SideNav Open: ', this.appService.getState().sideNavOpen)
  }

  closeSidenav() {
    this.appService.getState().sideNavOpen = false
    this.resizeSidenav()
  }

  openSidenav() {
    this.closeMessagePanel()
    this.appService.getState().sideNavOpen = true
    this.resizeSidenav()
  }

  toggleSidenavMenu(menuName: string, isSub: boolean, isParent: boolean) {
    if (isParent) {
      this.activeSubMenuName = this.activeSubMenuName === menuName ? null : menuName
      return
    }

    if (isSub) {
      if (
        this.appService.getState().sideNavMode === 'push' ||
        this.appService.getState().sideNavMode === 'over'
      ) {
        this.toggleSidenav()
      }
      return
    }

    this.activeSubMenuName = null
    if (
      this.appService.getState().sideNavMode === 'push' ||
      this.appService.getState().sideNavMode === 'over'
    ) {
      this.toggleSidenav()
    }
    this.resizeSidenav()
  }

  toggleMessagePanel() {
    this.appService.getState().messagePanelOpen = !this.appService.getState()
      .messagePanelOpen
  }

  openMessagePanel() {
    if (
      this.appService.getState().sideNavMode === 'push' ||
      this.appService.getState().sideNavMode === 'over'
    ) {
      this.closeSidenav()
    }
    this.appService.getState().messagePanelOpen = true
  }

  closeMessagePanel() {
    this.appService.getState().messagePanelOpen = false
  }

  lock() {
    this.closeMessagePanel()
    // TODO: Fix Promise return
    this.router.navigateByUrl('/pages-signin')
  }

  selectedSearchItem(event) {
    if (this.searchItems) {
      for (const item of this.searchItems) {
        if (item.link === this.searchItem) {
          this.router.navigate([this.searchItem])
          break
        }
      }
    }
  }

  openThemeDialog() {
    const dialogRef = this.dialog.open(DialogThemeComponent)
  }
}
