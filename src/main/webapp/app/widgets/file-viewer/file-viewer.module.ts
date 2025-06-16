import { NgModule } from '@angular/core';
import { FileViewerComponent } from './file-viewer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [FileViewerComponent],
  exports: [FileViewerComponent],
})
export class FileViewerModule {}
