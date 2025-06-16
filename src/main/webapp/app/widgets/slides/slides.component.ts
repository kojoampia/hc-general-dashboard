import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'jhi-slider',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnDestroy {
  @Input() slides: any[] = [];
  @Input() imageWidth = '';
  @Input() imageHeight = '';
  @Input() slideWidth = '100%';
  @Input() slideHeight = '600px';
  @Input() showCaption = true;
  @Output() slideSelected = new EventEmitter<any>();

  containerStyle = 'width: '.concat(this.slideWidth).concat(' !important; height: ').concat(this.slideHeight).concat(' !important;');

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
