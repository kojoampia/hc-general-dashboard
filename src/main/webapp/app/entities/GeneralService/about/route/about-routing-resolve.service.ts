import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAbout, About } from '../about.model';
import { AboutService } from '../service/about.service';

@Injectable({ providedIn: 'root' })
export class AboutRoutingResolveService implements Resolve<IAbout> {
  constructor(protected service: AboutService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAbout> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((about: HttpResponse<About>) => {
          if (about.body) {
            return of(about.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new About());
  }
}
