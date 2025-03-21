import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrPageComponent } from './qr-page.component';
import { QRCodeComponent } from 'angularx-qrcode';

const customersRoutes: Routes = [
  {
    path: '',
    component: QrPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes), QRCodeComponent],
  exports: [RouterModule],
})
export class QrPageModule {}
