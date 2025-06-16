import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FaqCategoryComponent } from './list/faq-category.component';
import { FaqCategoryRoutingModule } from './route/faq-category-routing.module';

@NgModule({
  imports: [SharedModule, FaqCategoryRoutingModule],
  declarations: [FaqCategoryComponent],
  entryComponents: [],
})
export class GeneralServiceFaqCategoryModule {}
