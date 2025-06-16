import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
})
export class InfoBoxComponent implements OnInit, OnDestroy {
  url?: string;
  title?: string;
  safeHtml?: SafeHtml;
  entity?: any;
  private destroyed$ = new Subject<boolean>();

  constructor(private sanitizer: DomSanitizer, private modal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.url) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  close(): void {
    this.modal.close();
  }
}
