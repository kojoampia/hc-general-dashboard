import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FeatureItemComponent } from '../list/feature-item.component';
import { FeatureItemDetailComponent } from '../detail/feature-item-detail.component';
import { FeatureItemUpdateComponent } from '../update/feature-item-update.component';
import { FeatureItemRoutingResolveService } from './feature-item-routing-resolve.service';

const featureItemRoute: Routes = [
  {
    path: '',
    component: FeatureItemComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FeatureItemDetailComponent,
    resolve: {
      featureItem: FeatureItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FeatureItemUpdateComponent,
    resolve: {
      featureItem: FeatureItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FeatureItemUpdateComponent,
    resolve: {
      featureItem: FeatureItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(featureItemRoute)],
  exports: [RouterModule],
})
export class FeatureItemRoutingModule {}
