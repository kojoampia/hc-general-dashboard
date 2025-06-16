import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeatureItem } from '../feature-item.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-feature-item-detail',
  templateUrl: './feature-item-detail.component.html',
})
export class FeatureItemDetailComponent implements OnInit {
  featureItem: IFeatureItem | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ featureItem }) => {
      this.featureItem = featureItem;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
