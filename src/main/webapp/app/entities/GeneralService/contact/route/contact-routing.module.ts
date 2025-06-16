import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from '../list/contact.component';

const contactRoute: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(contactRoute)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
