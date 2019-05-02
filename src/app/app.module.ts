import { LayoutModule } from '@angular/cdk/layout'
import { CdkTableModule } from '@angular/cdk/table'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material'
import { MatGridListModule } from '@angular/material/grid-list'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore'
import 'hammerjs'
import { ButtonModule } from 'primeng/button'
import { DataViewModule } from 'primeng/dataview'
import { DropdownModule } from 'primeng/dropdown'
import { StepsModule } from 'primeng/steps'
import { TableModule } from 'primeng/table'
import { environment } from '../environments/environment'
import { ROUTES } from './app.router'
import { AddEnterpriseDialogComponent } from './dialogs/add-enterprise-dialog/add-enterprise-dialog.component'
import { AddLandDialogComponent } from './dialogs/add-land-dialog/add-land-dialog.component'
import { DeleteEnterpriseDialogComponent } from './dialogs/delete-enterprise-dialog/delete-enterprise-dialog.component'
import { DeleteLandDialogComponent } from './dialogs/delete-land-dialog/delete-land-dialog.component'
import { EditEnterpriseDialogComponent } from './dialogs/edit-enterprise-dialog/edit-enterprise-dialog.component'
import { DialogThemeComponent } from './dialogs/theme-dialog/dialog-theme.component'
import { MaterialModule } from './modules/material.module'
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component'
import { EnterprisesComponent } from './pages/enterprises/enterprises.component'
import { FarmersListPageComponent } from './pages/farmers-list-page/farmers-list-page.component'
import { AppComponent } from './pages/root/app.component'
import { SigninPageComponent } from './pages/signin/signin-page.component'
import { AppService } from './services/app.service'
import { FormErrorMatcher } from './services/error.matcher'
import { FarmerRegistrationComponent } from './pages/farmer-registration/farmer-registration.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    SigninPageComponent,
    DialogThemeComponent,
    AddEnterpriseDialogComponent,
    EditEnterpriseDialogComponent,
    DeleteEnterpriseDialogComponent,
    AddLandDialogComponent,
    DeleteLandDialogComponent,
    FarmersListPageComponent,
    EnterprisesComponent,
    FarmerRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    TableModule,
    DataViewModule,
    MatGridListModule,
    ButtonModule,
    CdkTableModule,
    HttpClientModule,
    // FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    MaterialModule,
    RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: false }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    StepsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    AngularFireAuth,
    AngularFirestore,
    FormBuilder,
    { provide: FormErrorMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogThemeComponent,
    AddEnterpriseDialogComponent,
    EditEnterpriseDialogComponent,
    DeleteEnterpriseDialogComponent,
    AddLandDialogComponent,
    DeleteLandDialogComponent,
  ],
})
export class AppModule {}
