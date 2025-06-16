/* eslint-disable */
import { Component, Input, OnInit, ɵSafeHtml } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements OnInit {
  @Input() title?: string;
  @Input() content?: string;
  safeContent?: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.content) {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content!);
    }
  }
}
