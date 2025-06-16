import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Search } from 'app/core/request/request.model';
import { IFeatureItem, getFeatureItemIdentifier } from '../feature-item.model';

export type EntityResponseType = HttpResponse<IFeatureItem>;
export type EntityArrayResponseType = HttpResponse<IFeatureItem[]>;

@Injectable({ providedIn: 'root' })
export class FeatureItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/feature-items', 'generalservice');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/feature-items', 'generalservice');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(featureItem: IFeatureItem): Observable<EntityResponseType> {
    return this.http.post<IFeatureItem>(this.resourceUrl, featureItem, { observe: 'response' });
  }

  update(featureItem: IFeatureItem): Observable<EntityResponseType> {
    return this.http.put<IFeatureItem>(`${this.resourceUrl}/${getFeatureItemIdentifier(featureItem) as string}`, featureItem, {
      observe: 'response',
    });
  }

  partialUpdate(featureItem: IFeatureItem): Observable<EntityResponseType> {
    return this.http.patch<IFeatureItem>(`${this.resourceUrl}/${getFeatureItemIdentifier(featureItem) as string}`, featureItem, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IFeatureItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFeatureItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFeatureItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addFeatureItemToCollectionIfMissing(
    featureItemCollection: IFeatureItem[],
    ...featureItemsToCheck: (IFeatureItem | null | undefined)[]
  ): IFeatureItem[] {
    const featureItems: IFeatureItem[] = featureItemsToCheck.filter(isPresent);
    if (featureItems.length > 0) {
      const featureItemCollectionIdentifiers = featureItemCollection.map(featureItemItem => getFeatureItemIdentifier(featureItemItem)!);
      const featureItemsToAdd = featureItems.filter(featureItemItem => {
        const featureItemIdentifier = getFeatureItemIdentifier(featureItemItem);
        if (featureItemIdentifier == null || featureItemCollectionIdentifiers.includes(featureItemIdentifier)) {
          return false;
        }
        featureItemCollectionIdentifiers.push(featureItemIdentifier);
        return true;
      });
      return [...featureItemsToAdd, ...featureItemCollection];
    }
    return featureItemCollection;
  }
}
