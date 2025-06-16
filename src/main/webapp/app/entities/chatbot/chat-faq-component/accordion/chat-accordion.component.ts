import { Component, Input, OnInit } from '@angular/core';
import { IFrequentAsked } from 'app/entities/GeneralService/frequent-asked/frequent-asked.model';

@Component({
  selector: 'jhi-chat-accordion',
  templateUrl: './chat-accordion.component.html',
  styleUrls: ['./chat-accordion.component.scss'],
})
export class ChatAccordionComponent implements OnInit {
  @Input() faq?: IFrequentAsked;

  isPanelOpen = false;

  constructor() {}

  ngOnInit(): void {}

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }
}
