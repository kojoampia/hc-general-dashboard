import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FaqCategoryComponent } from '../list/faq-category.component';
import { FaqCategoryDetailComponent } from '../detail/faq-category-detail.component';
import { FaqCategoryUpdateComponent } from '../update/faq-category-update.component';
import { FaqCategoryRoutingResolveService } from './faq-category-routing-resolve.service';

const faqCategoryRoute: Routes = [
  {
    path: '',
    component: FaqCategoryComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FaqCategoryDetailComponent,
    resolve: {
      faqCategory: FaqCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FaqCategoryUpdateComponent,
    resolve: {
      faqCategory: FaqCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FaqCategoryUpdateComponent,
    resolve: {
      faqCategory: FaqCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(faqCategoryRoute)],
  exports: [RouterModule],
})
export class FaqCategoryRoutingModule {}
