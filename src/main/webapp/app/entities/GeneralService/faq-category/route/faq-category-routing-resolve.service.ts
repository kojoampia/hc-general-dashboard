import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFaqCategory, FaqCategory } from '../faq-category.model';
import { FaqCategoryService } from '../service/faq-category.service';

@Injectable({ providedIn: 'root' })
export class FaqCategoryRoutingResolveService implements Resolve<IFaqCategory> {
  constructor(protected service: FaqCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFaqCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((faqCategory: HttpResponse<FaqCategory>) => {
          if (faqCategory.body) {
            return of(faqCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FaqCategory());
  }
}
