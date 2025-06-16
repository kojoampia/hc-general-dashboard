import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { FeatureBoxModule } from 'app/entities/GeneralService/feature/feature-box/feature-box.module';
import { FileViewerModule } from 'app/widgets/file-viewer/file-viewer.module';
import { BarModule } from 'app/widgets/filter/bar.module';
import { InfoBoxModule } from 'app/widgets/info-box/info-box.module';
import { InfoBoxSmallModule } from 'app/widgets/info-box-sm/info-box-small.module';
import { PageDisplayModule } from 'app/widgets/page-display/page-display.module';
import { SlidesModule } from 'app/widgets/slides/slides.module';
import { TileboxModule } from 'app/widgets/tilebox/tilebox.module';

@NgModule({
  imports: [
    SharedModule, 
    RouterModule.forChild([HOME_ROUTE]), 
    FeatureBoxModule, 
    FileViewerModule, 
    BarModule,
    InfoBoxModule,
    InfoBoxSmallModule,
    PageDisplayModule,
    SlidesModule,
    TileboxModule,
],
  declarations: [HomeComponent],
})
export class HomeModule {}
