import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFaqCategory } from '../faq-category.model';
import { FaqCategoryService } from '../service/faq-category.service';

@Component({
  selector: 'jhi-faq-category',
  templateUrl: './faq-category.component.html',
})
export class FaqCategoryComponent implements OnInit {
  faqCategories?: IFaqCategory[];
  isLoading = false;
  currentSearch: string;

  constructor(
    protected faqCategoryService: FaqCategoryService,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.faqCategoryService
        .search({
          query: this.currentSearch,
        })
        .subscribe({
          next: (res: HttpResponse<IFaqCategory[]>) => {
            this.isLoading = false;
            this.faqCategories = res.body ?? [];
          },
          error: () => {
            this.isLoading = false;
          },
        });
      return;
    }

    this.faqCategoryService.query().subscribe({
      next: (res: HttpResponse<IFaqCategory[]>) => {
        this.isLoading = false;
        this.faqCategories = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IFaqCategory): string {
    return item.id!;
  }

}
