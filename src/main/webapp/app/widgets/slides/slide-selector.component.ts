import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'jhi-slide-selector',
  templateUrl: './slide-selector.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlideSelectorComponent implements OnDestroy {
  @Input() slides: any[] = [];
  @Output() slideSelected = new EventEmitter<any>();

  ngOnDestroy(): void {
    this.slideSelected = Object.assign({});
  }

  onClick(item: any): void {
    this.slideSelected.emit(item);
  }

  trackId(index: number): number {
    return index;
  }
}
