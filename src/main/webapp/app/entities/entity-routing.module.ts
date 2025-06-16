import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'about',
        data: { pageTitle: 'generalDashboardApp.generalServiceAbout.home.title' },
        loadChildren: () => import('./GeneralService/about/about.module').then(m => m.GeneralServiceAboutModule),
      },
      {
        path: 'contact',
        data: { pageTitle: 'generalDashboardApp.generalServiceContact.home.title' },
        loadChildren: () => import('./GeneralService/contact/contact.module').then(m => m.GeneralServiceContactModule),
      },
      {
        path: 'frequent-asked',
        data: { pageTitle: 'generalDashboardApp.generalServiceFrequentAsked.home.title' },
        loadChildren: () => import('./GeneralService/frequent-asked/frequent-asked.module').then(m => m.GeneralServiceFrequentAskedModule),
      },
      {
        path: 'features',
        data: { pageTitle: 'generalDashboardApp.generalServiceFeature.home.title' },
        loadChildren: () => import('./GeneralService/feature/feature.module').then(m => m.GeneralServiceFeatureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
