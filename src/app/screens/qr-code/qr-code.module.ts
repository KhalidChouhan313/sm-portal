import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from './qr-code.component';

const customersRoutes: Routes = [
    {
        path: '',
        component: QrCodeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(customersRoutes)],
    exports: [RouterModule],
})
export class QrCodeModule { }