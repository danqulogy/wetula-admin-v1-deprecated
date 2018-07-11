import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';
import { AppComponent } from './pages/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material.module';
import {FormsModule} from '@angular/forms';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { SigninPageComponent } from './pages/signin/signin-page.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.router';
import {AppService} from './services/app.service';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormErrorMatcher} from './services/error.matcher';
import {ShowOnDirtyErrorStateMatcher, MatToolbarModule,
  MatButtonModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import {DialogThemeComponent} from './dialogs/theme-dialog/dialog-theme.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from '@angular/cdk/layout';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    SigninPageComponent,
    DialogThemeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: false }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production}),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AppService, AngularFireAuth, {provide: FormErrorMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
  entryComponents: [DialogThemeComponent]
})
export class AppModule { }
