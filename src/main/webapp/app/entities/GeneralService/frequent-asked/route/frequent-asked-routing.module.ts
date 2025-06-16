import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequentAskedComponent } from '../list/frequent-asked.component';

const frequentAskedRoute: Routes = [
  {
    path: '',
    component: FrequentAskedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(frequentAskedRoute)],
  exports: [RouterModule],
})
export class FrequentAskedRoutingModule {}
