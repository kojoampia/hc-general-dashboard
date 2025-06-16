import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jhi-info-box-small',
  templateUrl: './info-box-small.component.html',
  styleUrls: ['./info-box-small.component.scss'],
})
export class InfoBoxSmallComponent {
  @Input() info?: any;
  @Input() title?: string;
  @Output() infoSelected: EventEmitter<any> = new EventEmitter();

  select(item: any): void {
    this.infoSelected.emit(item);
  }
}
