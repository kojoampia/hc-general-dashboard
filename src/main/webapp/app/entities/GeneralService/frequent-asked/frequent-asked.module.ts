import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FrequentAskedComponent } from './list/frequent-asked.component';
import { FrequentAskedDetailComponent } from './detail/frequent-asked-detail.component';
import { FrequentAskedRoutingModule } from './route/frequent-asked-routing.module';

@NgModule({
  imports: [SharedModule, FrequentAskedRoutingModule],
  declarations: [FrequentAskedComponent, FrequentAskedDetailComponent],
  entryComponents: [],
})
export class GeneralServiceFrequentAskedModule {}
