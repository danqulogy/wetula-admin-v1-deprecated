import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuth } from 'angularfire2/auth'
import 'hammerjs'
import { WetulaLibModule } from 'wetula-lib'
import { environment } from '../environments/environment'
import { ROUTES } from './app.router'
import { DialogThemeComponent } from './dialogs/theme-dialog/dialog-theme.component'
import { MaterialModule } from './modules/material.module'
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component'
import { AppComponent } from './pages/root/app.component'
import { SigninPageComponent } from './pages/signin/signin-page.component'
import { AppService } from './services/app.service'
import { FormErrorMatcher } from './services/error.matcher';
import { FarmersListPageComponent } from './pages/farmers-list-page/farmers-list-page.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    SigninPageComponent,
    DialogThemeComponent,
    FarmersListPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    WetulaLibModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: false }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    AngularFireAuth,
    { provide: FormErrorMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogThemeComponent],
})
export class AppModule {}
