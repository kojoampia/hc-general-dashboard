import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AboutComponent } from './list/about.component';
import { AboutRoutingModule } from './route/about-routing.module';
import { FileViewerModule } from 'app/widgets/file-viewer/file-viewer.module';
import { PageDisplayModule } from 'app/widgets/page-display/page-display.module';

@NgModule({
  imports: [SharedModule, AboutRoutingModule, FileViewerModule, PageDisplayModule],
  declarations: [AboutComponent],
  entryComponents: [],
})
export class GeneralServiceAboutModule {}
