import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFeatureItem } from '../feature-item.model';
import { FeatureItemService } from '../service/feature-item.service';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-feature-item',
  templateUrl: './feature-item.component.html',
})
export class FeatureItemComponent implements OnInit {
  featureItems?: IFeatureItem[];
  isLoading = false;
  currentSearch: string;

  constructor(
    protected featureItemService: FeatureItemService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.featureItemService
        .search({
          query: this.currentSearch,
        })
        .subscribe({
          next: (res: HttpResponse<IFeatureItem[]>) => {
            this.isLoading = false;
            this.featureItems = res.body ?? [];
          },
          error: () => {
            this.isLoading = false;
          },
        });
      return;
    }

    this.featureItemService.query().subscribe({
      next: (res: HttpResponse<IFeatureItem[]>) => {
        this.isLoading = false;
        this.featureItems = res.body ?? [];
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

  trackId(index: number, item: IFeatureItem): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

}
