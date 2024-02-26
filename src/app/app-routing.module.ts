import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { BlockListComponent } from './block-list/block-list.component';
import { DevicesComponent } from './devices/devices.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "messages",
    component: MessagesComponent
  },
  {
    path: "block-list",
    component: BlockListComponent
  },
  {
    path: "devices",
    component: DevicesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
