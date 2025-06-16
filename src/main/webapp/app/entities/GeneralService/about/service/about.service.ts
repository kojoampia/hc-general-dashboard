import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Search } from 'app/core/request/request.model';
import { IAbout, getAboutIdentifier } from '../about.model';

export type EntityResponseType = HttpResponse<IAbout>;
export type EntityArrayResponseType = HttpResponse<IAbout[]>;

@Injectable({ providedIn: 'root' })
export class AboutService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/abouts', 'generalservice');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/abouts', 'generalservice');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(about: IAbout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(about);
    return this.http
      .post<IAbout>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(about: IAbout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(about);
    return this.http
      .put<IAbout>(`${this.resourceUrl}/${getAboutIdentifier(about) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(about: IAbout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(about);
    return this.http
      .patch<IAbout>(`${this.resourceUrl}/${getAboutIdentifier(about) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IAbout>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbout[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbout[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addAboutToCollectionIfMissing(aboutCollection: IAbout[], ...aboutsToCheck: (IAbout | null | undefined)[]): IAbout[] {
    const abouts: IAbout[] = aboutsToCheck.filter(isPresent);
    if (abouts.length > 0) {
      const aboutCollectionIdentifiers = aboutCollection.map(aboutItem => getAboutIdentifier(aboutItem)!);
      const aboutsToAdd = abouts.filter(aboutItem => {
        const aboutIdentifier = getAboutIdentifier(aboutItem);
        if (aboutIdentifier == null || aboutCollectionIdentifiers.includes(aboutIdentifier)) {
          return false;
        }
        aboutCollectionIdentifiers.push(aboutIdentifier);
        return true;
      });
      return [...aboutsToAdd, ...aboutCollection];
    }
    return aboutCollection;
  }

  protected convertDateFromClient(about: IAbout): IAbout {
    return Object.assign({}, about, {
      createdDate: about.createdDate?.isValid() ? about.createdDate.format(DATE_FORMAT) : undefined,
      modifiedDate: about.modifiedDate?.isValid() ? about.modifiedDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? dayjs(res.body.createdDate) : undefined;
      res.body.modifiedDate = res.body.modifiedDate ? dayjs(res.body.modifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((about: IAbout) => {
        about.createdDate = about.createdDate ? dayjs(about.createdDate) : undefined;
        about.modifiedDate = about.modifiedDate ? dayjs(about.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
