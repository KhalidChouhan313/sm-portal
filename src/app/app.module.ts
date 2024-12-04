import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './screens/home/home.component';
import { MessagesComponent } from './screens/messages/messages.component';
import { BlockListComponent } from './screens/block-list/block-list.component';
import { DevicesComponent } from './screens/devices/devices.component';
import { MessagesSidebarComponent } from './components/messages-sidebar/messages-sidebar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StatsComponent } from './components/stats/stats.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingsComponent } from './screens/bookings/bookings.component';
import { CustomersComponent } from './screens/customers/customers.component';
import { ChatFlowComponent } from './screens/chat-flow/chat-flow.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { AppSettingsComponent } from './screens/app-settings/app-settings.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MessagesComponent,
    BlockListComponent,
    DevicesComponent,
    MessagesSidebarComponent,
    ReportsComponent,
    StatsComponent,
    ActivityDetailsComponent,
    LoginComponent,
    SidebarComponent,
    BookingsComponent,
    CustomersComponent,
    ChatFlowComponent,
    DoughnutChartComponent,
    AppSettingsComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
