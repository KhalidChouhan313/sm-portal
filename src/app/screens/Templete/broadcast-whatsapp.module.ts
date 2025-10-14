import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastWhatsappComponent } from './broadcast-whatsapp.component';

const Templates: Routes = [
  {
    path: '',
    component: BroadcastWhatsappComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(Templates)],
  exports: [RouterModule],
})
export class TemplatesModule {}
