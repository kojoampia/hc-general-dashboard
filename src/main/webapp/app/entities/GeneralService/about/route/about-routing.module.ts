import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '../list/about.component';

const aboutRoute: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(aboutRoute)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
