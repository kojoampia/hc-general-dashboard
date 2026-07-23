import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from 'app/entities/GeneralService/feature/feature.model';

@Component({
  selector: 'jhi-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss'],
})
export class FeatureBoxComponent implements OnInit {
  @Input() feature?: Feature;
  featureBox = '';
  featureName?: string;
  featureItem?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const colorName = this.feature?.name?.toLowerCase();
    this.featureBox = colorName ?? 'feature';
    this.featureName = colorName?.concat('Name') ?? 'featureName';
    this.featureItem = colorName?.concat('Item') ?? 'featureItem';
  }

  openFeature(feature: Feature): void {
    // this.router.navigate([feature.url], { queryParams: { 'id': feature.id , 'feature': feature } });
    this.router.navigate([feature.url], { queryParams: { name: feature.id } });
  }
}
