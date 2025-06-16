import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { LanguageType } from 'app/entities/enumerations/language-type.model';
import { IAbout, About } from '../about.model';

import { AboutService } from './about.service';

describe('About Service', () => {
  let service: AboutService;
  let httpMock: HttpTestingController;
  let elemDefault: IAbout;
  let expectedResult: IAbout | IAbout[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AboutService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 'AAAAAAA',
      title: 'AAAAAAA',
      content: 'AAAAAAA',
      language: LanguageType.EN,
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

    it('should create a About', () => {
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

      service.create(new About()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a About', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          title: 'BBBBBB',
          content: 'BBBBBB',
          language: 'BBBBBB',
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

    it('should partial update a About', () => {
      const patchObject = Object.assign(
        {
          title: 'BBBBBB',
          language: 'BBBBBB',
          createdDate: currentDate.format(DATE_FORMAT),
          modifiedDate: currentDate.format(DATE_FORMAT),
          createdBy: 'BBBBBB',
          modifiedBy: 'BBBBBB',
        },
        new About()
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

    it('should return a list of About', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          title: 'BBBBBB',
          content: 'BBBBBB',
          language: 'BBBBBB',
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

    it('should delete a About', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAboutToCollectionIfMissing', () => {
      it('should add a About to an empty array', () => {
        const about: IAbout = { id: 'ABC' };
        expectedResult = service.addAboutToCollectionIfMissing([], about);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(about);
      });

      it('should not add a About to an array that contains it', () => {
        const about: IAbout = { id: 'ABC' };
        const aboutCollection: IAbout[] = [
          {
            ...about,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addAboutToCollectionIfMissing(aboutCollection, about);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a About to an array that doesn't contain it", () => {
        const about: IAbout = { id: 'ABC' };
        const aboutCollection: IAbout[] = [{ id: 'CBA' }];
        expectedResult = service.addAboutToCollectionIfMissing(aboutCollection, about);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(about);
      });

      it('should add only unique About to an array', () => {
        const aboutArray: IAbout[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'f79f929e-a3ea-405c-b38f-db16742141ab' }];
        const aboutCollection: IAbout[] = [{ id: 'ABC' }];
        expectedResult = service.addAboutToCollectionIfMissing(aboutCollection, ...aboutArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const about: IAbout = { id: 'ABC' };
        const about2: IAbout = { id: 'CBA' };
        expectedResult = service.addAboutToCollectionIfMissing([], about, about2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(about);
        expect(expectedResult).toContain(about2);
      });

      it('should accept null and undefined values', () => {
        const about: IAbout = { id: 'ABC' };
        expectedResult = service.addAboutToCollectionIfMissing([], null, about, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(about);
      });

      it('should return initial array if no About is added', () => {
        const aboutCollection: IAbout[] = [{ id: 'ABC' }];
        expectedResult = service.addAboutToCollectionIfMissing(aboutCollection, undefined, null);
        expect(expectedResult).toEqual(aboutCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
