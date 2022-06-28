import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { PpgRoutingModule } from './account-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../material/material.module';
import { AccountComponent } from './account.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PasswordComponent } from './pages/password/password.component';

@NgModule({
  declarations: [
    EditAccountComponent,
    AccountComponent,
    CardComponent,
    OverviewComponent,
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LayoutModule,
    FlexLayoutModule,
    SharedModule,
    PpgRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AccountModule {}
