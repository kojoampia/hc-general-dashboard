import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InfoBoxComponent } from './info-box.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    InfoBoxComponent,
  ],
  exports: [InfoBoxComponent]
})
export class InfoBoxModule {}
