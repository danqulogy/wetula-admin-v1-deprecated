import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatListModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatChipsModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatListModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatChipsModule,

  ],
  declarations: []
})
export class MaterialModule { }
