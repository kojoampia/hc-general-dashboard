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
import { IFrequentAsked, getFrequentAskedIdentifier } from '../frequent-asked.model';

export type EntityResponseType = HttpResponse<IFrequentAsked>;
export type EntityArrayResponseType = HttpResponse<IFrequentAsked[]>;

@Injectable({ providedIn: 'root' })
export class FrequentAskedService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/frequent-askeds', 'generalservice');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/frequent-askeds', 'generalservice');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(frequentAsked: IFrequentAsked): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(frequentAsked);
    return this.http
      .post<IFrequentAsked>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(frequentAsked: IFrequentAsked): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(frequentAsked);
    return this.http
      .put<IFrequentAsked>(`${this.resourceUrl}/${getFrequentAskedIdentifier(frequentAsked) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(frequentAsked: IFrequentAsked): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(frequentAsked);
    return this.http
      .patch<IFrequentAsked>(`${this.resourceUrl}/${getFrequentAskedIdentifier(frequentAsked) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IFrequentAsked>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFrequentAsked[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFrequentAsked[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addFrequentAskedToCollectionIfMissing(
    frequentAskedCollection: IFrequentAsked[],
    ...frequentAskedsToCheck: (IFrequentAsked | null | undefined)[]
  ): IFrequentAsked[] {
    const frequentAskeds: IFrequentAsked[] = frequentAskedsToCheck.filter(isPresent);
    if (frequentAskeds.length > 0) {
      const frequentAskedCollectionIdentifiers = frequentAskedCollection.map(
        frequentAskedItem => getFrequentAskedIdentifier(frequentAskedItem)!
      );
      const frequentAskedsToAdd = frequentAskeds.filter(frequentAskedItem => {
        const frequentAskedIdentifier = getFrequentAskedIdentifier(frequentAskedItem);
        if (frequentAskedIdentifier == null || frequentAskedCollectionIdentifiers.includes(frequentAskedIdentifier)) {
          return false;
        }
        frequentAskedCollectionIdentifiers.push(frequentAskedIdentifier);
        return true;
      });
      return [...frequentAskedsToAdd, ...frequentAskedCollection];
    }
    return frequentAskedCollection;
  }

  protected convertDateFromClient(frequentAsked: IFrequentAsked): IFrequentAsked {
    return Object.assign({}, frequentAsked, {
      createdDate: frequentAsked.createdDate?.isValid() ? frequentAsked.createdDate.format(DATE_FORMAT) : undefined,
      modifiedDate: frequentAsked.modifiedDate?.isValid() ? frequentAsked.modifiedDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((frequentAsked: IFrequentAsked) => {
        frequentAsked.createdDate = frequentAsked.createdDate ? dayjs(frequentAsked.createdDate) : undefined;
        frequentAsked.modifiedDate = frequentAsked.modifiedDate ? dayjs(frequentAsked.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
