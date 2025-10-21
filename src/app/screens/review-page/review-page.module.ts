import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './review-page.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { CommonModule } from '@angular/common';
// import { QRCodeComponent } from 'angularx-qrcode';

const customersRoutes: Routes = [
  {
    path: '',
    component: ReviewPageComponent,
  },
];

@NgModule({
  imports: [CommonModule,LoaderComponent, RouterModule.forChild(customersRoutes),],
  exports: [RouterModule],
})
export class ReviewPageModule {}
