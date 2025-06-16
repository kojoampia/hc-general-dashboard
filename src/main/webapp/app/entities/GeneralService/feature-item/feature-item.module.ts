import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FeatureItemComponent } from './list/feature-item.component';
import { FeatureItemDetailComponent } from './detail/feature-item-detail.component';
import { FeatureItemRoutingModule } from './route/feature-item-routing.module';

@NgModule({
  imports: [SharedModule, FeatureItemRoutingModule],
  declarations: [FeatureItemComponent, FeatureItemDetailComponent],
  entryComponents: [],
})
export class GeneralServiceFeatureItemModule {}
