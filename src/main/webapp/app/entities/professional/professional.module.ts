import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProfessionalRoutingModule } from './professional.routing.module';
import { ProfessionalComponent } from './professional.component';



@NgModule({
  declarations: [ProfessionalComponent],
  imports: [
    SharedModule, ProfessionalRoutingModule
  ]
})
export class ProfessionalModule { }
