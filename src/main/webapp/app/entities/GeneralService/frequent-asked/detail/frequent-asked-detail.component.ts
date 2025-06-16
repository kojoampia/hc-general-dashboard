import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFrequentAsked } from '../frequent-asked.model';

@Component({
  selector: 'jhi-frequent-asked-detail',
  templateUrl: './frequent-asked-detail.component.html',
})
export class FrequentAskedDetailComponent implements OnInit {
  frequentAsked: IFrequentAsked | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ frequentAsked }) => {
      this.frequentAsked = frequentAsked;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
