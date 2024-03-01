import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'block-list',
    loadChildren: () => import('./block-list/block-list.module').then((m) => m.BlockListModule),
  },
  {
    path: 'devices',
    loadChildren: () => import('./devices/devices.module').then((m) => m.DevicesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
