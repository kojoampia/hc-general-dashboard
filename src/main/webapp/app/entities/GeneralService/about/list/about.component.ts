import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IAbout } from '../about.model';
import { AboutService } from '../service/about.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'jhi-about',
  templateUrl: './about.component.html',
  styleUrls: ['../about.component.scss'],
})
export class AboutComponent implements OnInit {
  abouts?: IAbout[];
  isLoading = false;

  // Load PDF Document
  safeUrl!: SafeHtml;
  title = 'Health Connect Project Brief';
  url = '/content/files/HealthConnect_Project_Brief.pdf';
  content!: string;

  constructor(protected aboutService: AboutService, private sanitizer: DomSanitizer) {}

  loadAll(): void {
    this.isLoading = true;
    this.aboutService.query().subscribe({
      next: (res: HttpResponse<IAbout[]>) => {
        this.isLoading = false;
        this.abouts = res.body ?? [];
        if (this.abouts.length > 0) {
          this.content = this.abouts[0].content ?? '';
          this.title = this.abouts[0].title ?? this.title;
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    if (this.url) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
    this.loadAll();
  }

  trackId(index: number, item: IAbout): string {
    return item.id!;
  }
}
