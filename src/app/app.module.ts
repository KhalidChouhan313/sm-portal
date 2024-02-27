import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { BlockListComponent } from './block-list/block-list.component';
import { DevicesComponent } from './devices/devices.component';
import { MessagesSidebarComponent } from './components/messages-sidebar/messages-sidebar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StatsComponent } from './components/stats/stats.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';

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
    ActivityDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
