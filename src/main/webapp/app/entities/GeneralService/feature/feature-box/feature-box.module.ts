import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FeatureBoxComponent } from './feature-box.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    FeatureBoxComponent,
  ],
  exports: [FeatureBoxComponent]
})
export class FeatureBoxModule {}
