import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./screens/messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'block-list',
    loadChildren: () =>
      import('./screens/block-list/block-list.module').then((m) => m.BlockListModule),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./screens/devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: 'chatbot/bookings',
    loadChildren: () =>
      import('./screens/bookings/bookings.module').then((m) => m.BookingsModule),
  },
  {
    path: 'chatbot/customers',
    loadChildren: () =>
      import('./screens/customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: 'chatbot/chat-flow',
    loadChildren: () =>
      import('./screens/chat-flow/chat-flow.module').then((m) => m.ChatflowModule),
  },
  {
    path: 'chatbot/bot-settings',
    loadChildren: () =>
      import('./screens/bot-settings/bot-settings.module').then((m) => m.BotSettingsModule),
  },
  {
    path: 'app-settings',
    loadChildren: () =>
      import('./screens/app-settings/app-settings.module').then((m) => m.AppSettingsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginModules),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
