import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BarComponent } from './bar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    BarComponent,
  ],
  exports: [BarComponent]
})
export class BarModule {}
