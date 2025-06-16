import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FeatureComponent } from './list/feature.component';
import { FeatureDetailComponent } from './detail/feature-detail.component';
import { FeatureRoutingModule } from './route/feature-routing.module';
import { FileViewerModule } from 'app/widgets/file-viewer/file-viewer.module';

@NgModule({
  imports: [SharedModule, FeatureRoutingModule, FileViewerModule],
  declarations: [
    FeatureComponent, 
    FeatureDetailComponent
  ],
  entryComponents: [],
})
export class GeneralServiceFeatureModule {}
