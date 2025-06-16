import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFeature, Feature } from '../feature.model';

import { FeatureService } from './feature.service';

describe('Feature Service', () => {
  let service: FeatureService;
  let httpMock: HttpTestingController;
  let elemDefault: IFeature;
  let expectedResult: IFeature | IFeature[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FeatureService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 'AAAAAAA',
      name: 'AAAAAAA',
      items: 'AAAAAAA',
      createdDate: currentDate,
      modifiedDate: currentDate,
      createdBy: 'AAAAAAA',
      modifiedBy: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Feature', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdDate: currentDate,
          modifiedDate: currentDate,
        },
        returnedFromService
      );

      service.create(new Feature()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Feature', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          items: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedDate: currentDate.format(DATE_FORMAT),
          createdBy: 'BBBBBB',
          modifiedBy: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdDate: currentDate,
          modifiedDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Feature', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          items: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedDate: currentDate.format(DATE_FORMAT),
          modifiedBy: 'BBBBBB',
        },
        new Feature()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          createdDate: currentDate,
          modifiedDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Feature', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          items: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedDate: currentDate.format(DATE_FORMAT),
          createdBy: 'BBBBBB',
          modifiedBy: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          createdDate: currentDate,
          modifiedDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Feature', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFeatureToCollectionIfMissing', () => {
      it('should add a Feature to an empty array', () => {
        const feature: IFeature = { id: 'ABC' };
        expectedResult = service.addFeatureToCollectionIfMissing([], feature);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(feature);
      });

      it('should not add a Feature to an array that contains it', () => {
        const feature: IFeature = { id: 'ABC' };
        const featureCollection: IFeature[] = [
          {
            ...feature,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addFeatureToCollectionIfMissing(featureCollection, feature);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Feature to an array that doesn't contain it", () => {
        const feature: IFeature = { id: 'ABC' };
        const featureCollection: IFeature[] = [{ id: 'CBA' }];
        expectedResult = service.addFeatureToCollectionIfMissing(featureCollection, feature);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(feature);
      });

      it('should add only unique Feature to an array', () => {
        const featureArray: IFeature[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: '317a6470-ac7a-4df3-80eb-51f58c3da7b7' }];
        const featureCollection: IFeature[] = [{ id: 'ABC' }];
        expectedResult = service.addFeatureToCollectionIfMissing(featureCollection, ...featureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const feature: IFeature = { id: 'ABC' };
        const feature2: IFeature = { id: 'CBA' };
        expectedResult = service.addFeatureToCollectionIfMissing([], feature, feature2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(feature);
        expect(expectedResult).toContain(feature2);
      });

      it('should accept null and undefined values', () => {
        const feature: IFeature = { id: 'ABC' };
        expectedResult = service.addFeatureToCollectionIfMissing([], null, feature, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(feature);
      });

      it('should return initial array if no Feature is added', () => {
        const featureCollection: IFeature[] = [{ id: 'ABC' }];
        expectedResult = service.addFeatureToCollectionIfMissing(featureCollection, undefined, null);
        expect(expectedResult).toEqual(featureCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
