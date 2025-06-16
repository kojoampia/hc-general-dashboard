import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalComponent } from './professional.component';

const professionalRoute: Routes = [
  {
    path: '',
    component: ProfessionalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(professionalRoute)],
  exports: [RouterModule],
})
export class ProfessionalRoutingModule {}
