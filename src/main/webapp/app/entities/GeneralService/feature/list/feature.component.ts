import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { IFeature } from '../feature.model';
import { FeatureService } from '../service/feature.service';
import { FeatureItem } from '../feature-item.model';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['../feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  features?: IFeature[];
  isLoading = false;
  currentSearch: string;
  featureItem?: FeatureItem;
  isOpen = false;
  url?: string;
  selectedFeature = 'professional';
  selectedName = 'Professional';
  safeUrl?: SafeHtml;



  constructor(protected featureService: FeatureService, protected activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
    const name = this.activatedRoute.snapshot.queryParams['name'] ?? 'Professional';
    this.setSelectedFeature(name);
  }


  setSelectedFeature(name: string): void {    
    this.selectedFeature = name.toLowerCase();
    this.selectedName = name.charAt(0).toUpperCase() + name.slice(1);
    // Check if the name contains a '#' character
    // If it does, split the name and set selectedFeature and selectedName accordingly
    if (name.indexOf('_') > 1){
      const parts = name.split('_');
      this.selectedFeature = parts[0].toLowerCase();
      this.selectedName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    }

    this.url = `/content/files/hc-${this.selectedFeature}.pdf`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.featureService
        .search({
          query: this.currentSearch,
        })
        .subscribe({
          next: (res: HttpResponse<IFeature[]>) => {
            this.isLoading = false;
            this.features = res.body ?? [];
          },
          error: () => {
            this.isLoading = false;
          },
        });
      return;
    }

    this.featureService.query().subscribe({
      next: (res: HttpResponse<IFeature[]>) => {
        this.isLoading = false;
        this.features = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });

    // Use this list if features is empty after 5 seconds
    setTimeout(() => {
      if (this.features?.length === 0) {
        this.loadFeatures();
      }
    }, 5000);
  }
  loadFeatures(): void {
    const featureList = [];
    for (let i = 0; i < 10; i++) {
      const item = new FeatureItem();
      featureList.push(item);
    }
  }

  select(item: string): void {
    this.setSelectedFeature(item);
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IFeature): string {
    return item.id!;
  }
}
