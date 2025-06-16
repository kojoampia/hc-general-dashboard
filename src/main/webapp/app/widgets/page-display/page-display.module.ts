import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PageDisplayComponent } from './page-display.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    PageDisplayComponent,
  ],
  exports: [PageDisplayComponent]
})
export class PageDisplayModule {}
