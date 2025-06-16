import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from '../list/feature.component';

const featureRoute: Routes = [
  {
    path: '',
    component: FeatureComponent
  },
  {
    path: ':id',
    component: FeatureComponent
  },
  {
    path: 'professional/:id',
    component: FeatureComponent
  },
  {
    path: 'patient/:id',
    component: FeatureComponent
  },
  {
    path: 'vendor/:id',
    component: FeatureComponent
  },
  {
    path: 'admin/:id',
    component: FeatureComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(featureRoute)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
