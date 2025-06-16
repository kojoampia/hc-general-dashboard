import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFrequentAsked, FrequentAsked } from '../frequent-asked.model';

import { FrequentAskedService } from './frequent-asked.service';

describe('FrequentAsked Service', () => {
  let service: FrequentAskedService;
  let httpMock: HttpTestingController;
  let elemDefault: IFrequentAsked;
  let expectedResult: IFrequentAsked | IFrequentAsked[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FrequentAskedService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 'AAAAAAA',
      question: 'AAAAAAA',
      answer: 'AAAAAAA',
      category: 'AAAAAAA',
      createdDate: currentDate,
      createdBy: 'AAAAAAA',
      modifiedDate: currentDate,
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

    it('should create a FrequentAsked', () => {
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

      service.create(new FrequentAsked()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FrequentAsked', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          question: 'BBBBBB',
          answer: 'BBBBBB',
          category: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          createdBy: 'BBBBBB',
          modifiedDate: currentDate.format(DATE_FORMAT),
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

    it('should partial update a FrequentAsked', () => {
      const patchObject = Object.assign(
        {
          question: 'BBBBBB',
          answer: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedBy: 'BBBBBB',
        },
        new FrequentAsked()
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

    it('should return a list of FrequentAsked', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          question: 'BBBBBB',
          answer: 'BBBBBB',
          category: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          createdBy: 'BBBBBB',
          modifiedDate: currentDate.format(DATE_FORMAT),
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

    it('should delete a FrequentAsked', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFrequentAskedToCollectionIfMissing', () => {
      it('should add a FrequentAsked to an empty array', () => {
        const frequentAsked: IFrequentAsked = { id: 'ABC' };
        expectedResult = service.addFrequentAskedToCollectionIfMissing([], frequentAsked);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(frequentAsked);
      });

      it('should not add a FrequentAsked to an array that contains it', () => {
        const frequentAsked: IFrequentAsked = { id: 'ABC' };
        const frequentAskedCollection: IFrequentAsked[] = [
          {
            ...frequentAsked,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addFrequentAskedToCollectionIfMissing(frequentAskedCollection, frequentAsked);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FrequentAsked to an array that doesn't contain it", () => {
        const frequentAsked: IFrequentAsked = { id: 'ABC' };
        const frequentAskedCollection: IFrequentAsked[] = [{ id: 'CBA' }];
        expectedResult = service.addFrequentAskedToCollectionIfMissing(frequentAskedCollection, frequentAsked);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(frequentAsked);
      });

      it('should add only unique FrequentAsked to an array', () => {
        const frequentAskedArray: IFrequentAsked[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'c2207d46-f0c1-4207-9869-f4e7c4a0cf9e' }];
        const frequentAskedCollection: IFrequentAsked[] = [{ id: 'ABC' }];
        expectedResult = service.addFrequentAskedToCollectionIfMissing(frequentAskedCollection, ...frequentAskedArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const frequentAsked: IFrequentAsked = { id: 'ABC' };
        const frequentAsked2: IFrequentAsked = { id: 'CBA' };
        expectedResult = service.addFrequentAskedToCollectionIfMissing([], frequentAsked, frequentAsked2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(frequentAsked);
        expect(expectedResult).toContain(frequentAsked2);
      });

      it('should accept null and undefined values', () => {
        const frequentAsked: IFrequentAsked = { id: 'ABC' };
        expectedResult = service.addFrequentAskedToCollectionIfMissing([], null, frequentAsked, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(frequentAsked);
      });

      it('should return initial array if no FrequentAsked is added', () => {
        const frequentAskedCollection: IFrequentAsked[] = [{ id: 'ABC' }];
        expectedResult = service.addFrequentAskedToCollectionIfMissing(frequentAskedCollection, undefined, null);
        expect(expectedResult).toEqual(frequentAskedCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
