import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { FullComponent } from './layout/full/full.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SearchComponent } from './components/search/search.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { ReportComponent } from './components/report/report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { FrameworksComponent } from './components/charts/frameworks/frameworks.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FullComponent,
    TopNavComponent,
    SidebarComponent,
    SearchComponent,
    UserConfigComponent,
    ReportComponent,
    DashboardComponent,
    CardComponent,
    FrameworksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
