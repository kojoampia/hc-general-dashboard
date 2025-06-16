import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFrequentAsked, FrequentAsked } from '../frequent-asked.model';
import { FrequentAskedService } from '../service/frequent-asked.service';

@Injectable({ providedIn: 'root' })
export class FrequentAskedRoutingResolveService implements Resolve<IFrequentAsked> {
  constructor(protected service: FrequentAskedService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFrequentAsked> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((frequentAsked: HttpResponse<FrequentAsked>) => {
          if (frequentAsked.body) {
            return of(frequentAsked.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FrequentAsked());
  }
}
