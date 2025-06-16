import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InfoBoxSmallComponent } from './info-box-small.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    InfoBoxSmallComponent,
  ],
  exports: [InfoBoxSmallComponent]
})
export class InfoBoxSmallModule {}
