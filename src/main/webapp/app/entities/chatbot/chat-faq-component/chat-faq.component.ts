import { Component, OnInit } from '@angular/core';
import { IFrequentAsked } from 'app/entities/GeneralService/frequent-asked/frequent-asked.model';
import { FrequentAskedService } from 'app/entities/GeneralService/frequent-asked/service/frequent-asked.service';
import { IFaqCategory } from 'app/entities/GeneralService/faq-category/faq-category.model';
import { FaqCategoryService } from 'app/entities/GeneralService/faq-category/service/faq-category.service';

@Component({
  selector: 'jhi-chat-faq',
  templateUrl: './chat-faq.component.html',
  styleUrls: ['./chat-faq.component.scss'],
})
export class ChatFaqComponent implements OnInit {
  faqCategoryList?: IFaqCategory[];
  faqList?: IFrequentAsked[];

  selectedCategory?: IFaqCategory;

  constructor(private faqCategoryService: FaqCategoryService, private faqService: FrequentAskedService) {}

  ngOnInit(): void {
    this.faqCategoryService.query().subscribe(
      categories => {
        const tempFaqCategoryList = categories.body || [];
        this.faqService.query().subscribe(
          faqs => {
            this.faqList = faqs.body || [];
            if (tempFaqCategoryList) {
              this.faqCategoryList = [];
              for (const cat of tempFaqCategoryList) {
                if (this.getFaqCount(cat) > 0) {
                  this.faqCategoryList.push(cat);
                }
              }
            }
          },
          () => {}
        );
      },
      () => {}
    );
  }

  public selectCategory(category: IFaqCategory): void {
    this.selectedCategory = category;
  }

  public onBack(): void {
    this.selectedCategory = undefined;
  }

  public getFaqCount(category: IFaqCategory): number {
    const count = this.faqList?.filter(faq => {
      if (category?.label === category.label) {
        return true;
      } else {
        return false;
      }
    }).length;

    return count || 0;
  }

  public getSelectedCategoryFaqs(): IFrequentAsked[] {
    return (
      this.faqList?.filter(faq => {
        if (faq?.category === this.selectedCategory?.label) {
          return true;
        } else {
          return false;
        }
      }) || []
    );
  }
}
