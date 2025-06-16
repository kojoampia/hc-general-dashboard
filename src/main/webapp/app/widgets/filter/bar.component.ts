import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jhi-filter-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() itemList?: any[] | [];
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

  filterSelected?: string | '';
  searchInput?: string | '';

  ngOnInit(): void {
    if (this.itemList && this.itemList.length > 0) {
      this.filterSelected = this.itemList[0].value;
    }
  }

  setFilterSelected(item = ''): void {
    this.filterSelected = item;
  }

  search(): void {
    this.selectedItem.emit({
      name: this.filterSelected,
      value: this.searchInput,
    });
  }
}
