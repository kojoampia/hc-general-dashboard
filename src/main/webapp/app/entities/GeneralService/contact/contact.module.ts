import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContactComponent } from './list/contact.component';
import { ContactRoutingModule } from './route/contact-routing.module';

@NgModule({
  imports: [SharedModule, ContactRoutingModule],
  declarations: [ContactComponent],
  entryComponents: [],
})
export class GeneralServiceContactModule {}
