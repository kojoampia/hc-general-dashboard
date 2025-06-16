import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Search } from 'app/core/request/request.model';
import { IFaqCategory, getFaqCategoryIdentifier } from '../faq-category.model';

export type EntityResponseType = HttpResponse<IFaqCategory>;
export type EntityArrayResponseType = HttpResponse<IFaqCategory[]>;

@Injectable({ providedIn: 'root' })
export class FaqCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/faq-categories', 'generalservice');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/faq-categories', 'generalservice');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(faqCategory: IFaqCategory): Observable<EntityResponseType> {
    return this.http.post<IFaqCategory>(this.resourceUrl, faqCategory, { observe: 'response' });
  }

  update(faqCategory: IFaqCategory): Observable<EntityResponseType> {
    return this.http.put<IFaqCategory>(`${this.resourceUrl}/${getFaqCategoryIdentifier(faqCategory) as string}`, faqCategory, {
      observe: 'response',
    });
  }

  partialUpdate(faqCategory: IFaqCategory): Observable<EntityResponseType> {
    return this.http.patch<IFaqCategory>(`${this.resourceUrl}/${getFaqCategoryIdentifier(faqCategory) as string}`, faqCategory, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IFaqCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFaqCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFaqCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addFaqCategoryToCollectionIfMissing(
    faqCategoryCollection: IFaqCategory[],
    ...faqCategoriesToCheck: (IFaqCategory | null | undefined)[]
  ): IFaqCategory[] {
    const faqCategories: IFaqCategory[] = faqCategoriesToCheck.filter(isPresent);
    if (faqCategories.length > 0) {
      const faqCategoryCollectionIdentifiers = faqCategoryCollection.map(faqCategoryItem => getFaqCategoryIdentifier(faqCategoryItem)!);
      const faqCategoriesToAdd = faqCategories.filter(faqCategoryItem => {
        const faqCategoryIdentifier = getFaqCategoryIdentifier(faqCategoryItem);
        if (faqCategoryIdentifier == null || faqCategoryCollectionIdentifiers.includes(faqCategoryIdentifier)) {
          return false;
        }
        faqCategoryCollectionIdentifiers.push(faqCategoryIdentifier);
        return true;
      });
      return [...faqCategoriesToAdd, ...faqCategoryCollection];
    }
    return faqCategoryCollection;
  }
}
