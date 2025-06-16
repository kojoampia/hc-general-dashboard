import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFeatureItem, FeatureItem } from '../feature-item.model';
import { FeatureItemService } from '../service/feature-item.service';

@Injectable({ providedIn: 'root' })
export class FeatureItemRoutingResolveService implements Resolve<IFeatureItem> {
  constructor(protected service: FeatureItemService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFeatureItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((featureItem: HttpResponse<FeatureItem>) => {
          if (featureItem.body) {
            return of(featureItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FeatureItem());
  }
}
