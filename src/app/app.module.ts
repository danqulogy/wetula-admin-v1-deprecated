import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import 'hammerjs';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { environment } from '../environments/environment';
import { ROUTES } from './app.router';
import { DialogThemeComponent } from './dialogs/theme-dialog/dialog-theme.component';
import { MaterialModule } from './modules/material.module';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { FarmersListPageComponent } from './pages/farmers-list-page/farmers-list-page.component';
import { AppComponent } from './pages/root/app.component';
import { SigninPageComponent } from './pages/signin/signin-page.component';
import { AppService } from './services/app.service';
import { FormErrorMatcher } from './services/error.matcher';



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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    TableModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
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
  entryComponents: [DialogThemeComponent],
})
export class AppModule { }
