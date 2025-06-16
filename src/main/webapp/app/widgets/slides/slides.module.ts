import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SlideSelectorComponent } from './slide-selector.component';
import { SlidesComponent } from './slides.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    SlidesComponent,
    SlideSelectorComponent,
  ],
  exports: [SlidesComponent, SlideSelectorComponent]
})
export class SlidesModule {}
