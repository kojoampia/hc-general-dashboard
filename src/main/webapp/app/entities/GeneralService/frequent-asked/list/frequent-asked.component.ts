import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFrequentAsked } from '../frequent-asked.model';
import { FrequentAskedService } from '../service/frequent-asked.service';

@Component({
  selector: 'jhi-frequent-asked',
  templateUrl: './frequent-asked.component.html',
})
export class FrequentAskedComponent implements OnInit {
  frequentAskeds?: IFrequentAsked[];
  isLoading = false;
  currentSearch: string;

  constructor(
    protected frequentAskedService: FrequentAskedService,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.frequentAskedService
        .search({
          query: this.currentSearch,
        })
        .subscribe({
          next: (res: HttpResponse<IFrequentAsked[]>) => {
            this.isLoading = false;
            this.frequentAskeds = res.body ?? [];
          },
          error: () => {
            this.isLoading = false;
          },
        });
      return;
    }

    this.frequentAskedService.query().subscribe({
      next: (res: HttpResponse<IFrequentAsked[]>) => {
        this.isLoading = false;
        this.frequentAskeds = res.body ?? [];
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

  trackId(index: number, item: IFrequentAsked): string {
    return item.id!;
  }

}
