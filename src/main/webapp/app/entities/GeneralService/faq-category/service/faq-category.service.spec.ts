import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFaqCategory, FaqCategory } from '../faq-category.model';

import { FaqCategoryService } from './faq-category.service';

describe('FaqCategory Service', () => {
  let service: FaqCategoryService;
  let httpMock: HttpTestingController;
  let elemDefault: IFaqCategory;
  let expectedResult: IFaqCategory | IFaqCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FaqCategoryService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      label: 'AAAAAAA',
      description: 'AAAAAAA',
      matIcon: 'AAAAAAA',
      color: 'AAAAAAA',
      svgIcon: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a FaqCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new FaqCategory()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FaqCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          label: 'BBBBBB',
          description: 'BBBBBB',
          matIcon: 'BBBBBB',
          color: 'BBBBBB',
          svgIcon: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FaqCategory', () => {
      const patchObject = Object.assign(
        {
          matIcon: 'BBBBBB',
          color: 'BBBBBB',
        },
        new FaqCategory()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FaqCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          label: 'BBBBBB',
          description: 'BBBBBB',
          matIcon: 'BBBBBB',
          color: 'BBBBBB',
          svgIcon: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a FaqCategory', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFaqCategoryToCollectionIfMissing', () => {
      it('should add a FaqCategory to an empty array', () => {
        const faqCategory: IFaqCategory = { id: 'ABC' };
        expectedResult = service.addFaqCategoryToCollectionIfMissing([], faqCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(faqCategory);
      });

      it('should not add a FaqCategory to an array that contains it', () => {
        const faqCategory: IFaqCategory = { id: 'ABC' };
        const faqCategoryCollection: IFaqCategory[] = [
          {
            ...faqCategory,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addFaqCategoryToCollectionIfMissing(faqCategoryCollection, faqCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FaqCategory to an array that doesn't contain it", () => {
        const faqCategory: IFaqCategory = { id: 'ABC' };
        const faqCategoryCollection: IFaqCategory[] = [{ id: 'CBA' }];
        expectedResult = service.addFaqCategoryToCollectionIfMissing(faqCategoryCollection, faqCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(faqCategory);
      });

      it('should add only unique FaqCategory to an array', () => {
        const faqCategoryArray: IFaqCategory[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: '7759ad97-41e3-4c4c-b9f2-04bf84f34b67' }];
        const faqCategoryCollection: IFaqCategory[] = [{ id: 'ABC' }];
        expectedResult = service.addFaqCategoryToCollectionIfMissing(faqCategoryCollection, ...faqCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const faqCategory: IFaqCategory = { id: 'ABC' };
        const faqCategory2: IFaqCategory = { id: 'CBA' };
        expectedResult = service.addFaqCategoryToCollectionIfMissing([], faqCategory, faqCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(faqCategory);
        expect(expectedResult).toContain(faqCategory2);
      });

      it('should accept null and undefined values', () => {
        const faqCategory: IFaqCategory = { id: 'ABC' };
        expectedResult = service.addFaqCategoryToCollectionIfMissing([], null, faqCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(faqCategory);
      });

      it('should return initial array if no FaqCategory is added', () => {
        const faqCategoryCollection: IFaqCategory[] = [{ id: 'ABC' }];
        expectedResult = service.addFaqCategoryToCollectionIfMissing(faqCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(faqCategoryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
