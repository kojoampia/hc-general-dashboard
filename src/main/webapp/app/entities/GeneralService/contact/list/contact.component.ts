import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContact } from '../contact.model';
import { ContactService } from '../service/contact.service';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contacts?: IContact[];
  isLoading = false;
  currentSearch: string;

  constructor(
    protected contactService: ContactService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.contactService
        .search({
          query: this.currentSearch,
        })
        .subscribe({
          next: (res: HttpResponse<IContact[]>) => {
            this.isLoading = false;
            this.contacts = res.body ?? [];
          },
          error: () => {
            this.isLoading = false;
          },
        });
      return;
    }

    this.contactService.query().subscribe({
      next: (res: HttpResponse<IContact[]>) => {
        this.isLoading = false;
        this.contacts = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IContact): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

}
