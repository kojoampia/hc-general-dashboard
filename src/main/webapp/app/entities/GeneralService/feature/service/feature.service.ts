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
import { IFeature, getFeatureIdentifier } from '../feature.model';

export type EntityResponseType = HttpResponse<IFeature>;
export type EntityArrayResponseType = HttpResponse<IFeature[]>;

@Injectable({ providedIn: 'root' })
export class FeatureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/features', 'generalservice');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/features', 'generalservice');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(feature: IFeature): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feature);
    return this.http
      .post<IFeature>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(feature: IFeature): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feature);
    return this.http
      .put<IFeature>(`${this.resourceUrl}/${getFeatureIdentifier(feature) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(feature: IFeature): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feature);
    return this.http
      .patch<IFeature>(`${this.resourceUrl}/${getFeatureIdentifier(feature) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IFeature>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFeature[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFeature[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addFeatureToCollectionIfMissing(featureCollection: IFeature[], ...featuresToCheck: (IFeature | null | undefined)[]): IFeature[] {
    const features: IFeature[] = featuresToCheck.filter(isPresent);
    if (features.length > 0) {
      const featureCollectionIdentifiers = featureCollection.map(featureItem => getFeatureIdentifier(featureItem)!);
      const featuresToAdd = features.filter(featureItem => {
        const featureIdentifier = getFeatureIdentifier(featureItem);
        if (featureIdentifier == null || featureCollectionIdentifiers.includes(featureIdentifier)) {
          return false;
        }
        featureCollectionIdentifiers.push(featureIdentifier);
        return true;
      });
      return [...featuresToAdd, ...featureCollection];
    }
    return featureCollection;
  }

  protected convertDateFromClient(feature: IFeature): IFeature {
    return Object.assign({}, feature, {
      createdDate: feature.createdDate?.isValid() ? feature.createdDate.format(DATE_FORMAT) : undefined,
      modifiedDate: feature.modifiedDate?.isValid() ? feature.modifiedDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((feature: IFeature) => {
        feature.createdDate = feature.createdDate ? dayjs(feature.createdDate) : undefined;
        feature.modifiedDate = feature.modifiedDate ? dayjs(feature.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
