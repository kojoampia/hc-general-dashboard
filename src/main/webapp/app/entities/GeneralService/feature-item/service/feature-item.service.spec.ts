import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFeatureItem, FeatureItem } from '../feature-item.model';

import { FeatureItemService } from './feature-item.service';

describe('FeatureItem Service', () => {
  let service: FeatureItemService;
  let httpMock: HttpTestingController;
  let elemDefault: IFeatureItem;
  let expectedResult: IFeatureItem | IFeatureItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FeatureItemService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      name: 'AAAAAAA',
      photoContentType: 'image/png',
      photo: 'AAAAAAA',
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

    it('should create a FeatureItem', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new FeatureItem()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FeatureItem', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          photo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FeatureItem', () => {
      const patchObject = Object.assign(
        {
          photo: 'BBBBBB',
        },
        new FeatureItem()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FeatureItem', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          photo: 'BBBBBB',
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

    it('should delete a FeatureItem', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFeatureItemToCollectionIfMissing', () => {
      it('should add a FeatureItem to an empty array', () => {
        const featureItem: IFeatureItem = { id: 'ABC' };
        expectedResult = service.addFeatureItemToCollectionIfMissing([], featureItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(featureItem);
      });

      it('should not add a FeatureItem to an array that contains it', () => {
        const featureItem: IFeatureItem = { id: 'ABC' };
        const featureItemCollection: IFeatureItem[] = [
          {
            ...featureItem,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addFeatureItemToCollectionIfMissing(featureItemCollection, featureItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FeatureItem to an array that doesn't contain it", () => {
        const featureItem: IFeatureItem = { id: 'ABC' };
        const featureItemCollection: IFeatureItem[] = [{ id: 'CBA' }];
        expectedResult = service.addFeatureItemToCollectionIfMissing(featureItemCollection, featureItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(featureItem);
      });

      it('should add only unique FeatureItem to an array', () => {
        const featureItemArray: IFeatureItem[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'dec60d91-e31c-447d-8963-5842ed56e138' }];
        const featureItemCollection: IFeatureItem[] = [{ id: 'ABC' }];
        expectedResult = service.addFeatureItemToCollectionIfMissing(featureItemCollection, ...featureItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const featureItem: IFeatureItem = { id: 'ABC' };
        const featureItem2: IFeatureItem = { id: 'CBA' };
        expectedResult = service.addFeatureItemToCollectionIfMissing([], featureItem, featureItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(featureItem);
        expect(expectedResult).toContain(featureItem2);
      });

      it('should accept null and undefined values', () => {
        const featureItem: IFeatureItem = { id: 'ABC' };
        expectedResult = service.addFeatureItemToCollectionIfMissing([], null, featureItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(featureItem);
      });

      it('should return initial array if no FeatureItem is added', () => {
        const featureItemCollection: IFeatureItem[] = [{ id: 'ABC' }];
        expectedResult = service.addFeatureItemToCollectionIfMissing(featureItemCollection, undefined, null);
        expect(expectedResult).toEqual(featureItemCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
