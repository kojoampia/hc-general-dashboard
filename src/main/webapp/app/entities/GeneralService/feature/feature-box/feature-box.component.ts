import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Feature } from 'app/entities/GeneralService/feature/feature.model';
import { FileViewerComponent } from 'app/widgets';

@Component({
  selector: 'jhi-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss']
})
export class FeatureBoxComponent implements OnInit {
  @Input() feature?:Feature;
  featureBox = '';
  featureName?: string;
  featureItem?: string;
  private isOpen = false;

  constructor(private router: Router, private modalService: NgbModal) {}


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
