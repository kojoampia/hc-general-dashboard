import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';
import { SharedModule } from 'app/shared/shared.module';
import { TileboxComponent } from './tilebox.component';

@NgModule({
  imports: [SharedModule, NguCarouselModule],
  declarations: [
    TileboxComponent,
  ],
  exports: [TileboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TileboxModule {}
