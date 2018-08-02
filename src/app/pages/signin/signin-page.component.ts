///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { AppService } from '../../services/app.service'
import { FormErrorMatcher } from '../../services/error.matcher'

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent implements OnInit, OnDestroy {
  email: string
  password: string
  snackBarRef: any
  isSubmitted = false
  snackBar: MatSnackBar

  emailFormControl = new FormControl('', [Validators.required, Validators.email])

  validator = new FormErrorMatcher()

  constructor(
    public appService: AppService,
    private _snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.snackBar = _snackBar
    appService.getState().pageFullScreen = true
    appService.getState().pageFooter = false
  }

  ngOnInit() {}

  login() {
    const self = this
    // self.router.navigateByUrl('/dashboard');
    this.isSubmitted = true
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(
      function(successCallback) {
        self.snackBar.open('Successful Login', '', {
          duration: 3000,
        })

        self.afAuth.authState.subscribe(function(next) {
          console.log('AUTHSTATE', next)
        })

        self.router.navigateByUrl('/dashboard')
        self.isSubmitted = false
      },
      function(failedObj) {
        setTimeout(function() {
          self.snackBar.open(failedObj, '', {
            duration: 3000,
            announcementMessage: 'announcement',
            politeness: 'polite',
          })

          self.isSubmitted = false
        }, 1000)
      }
    )
  }

  private onLoginError(crazyThis, failedObj) {}
  ngOnDestroy() {
    this.appService.getState().pageFullscreen = false
  }
}
