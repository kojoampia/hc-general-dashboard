import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { LanguageType } from 'app/entities/enumerations/language-type.model';
import { IContact, Contact } from '../contact.model';

import { ContactService } from './contact.service';

describe('Contact Service', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;
  let elemDefault: IContact;
  let expectedResult: IContact | IContact[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 'AAAAAAA',
      title: 'AAAAAAA',
      address: 'AAAAAAA',
      street: 'AAAAAAA',
      code: 'AAAAAAA',
      city: 'AAAAAAA',
      state: 'AAAAAAA',
      region: 'AAAAAAA',
      country: 'AAAAAAA',
      telephone: 'AAAAAAA',
      email: 'AAAAAAA',
      whatsapp: 'AAAAAAA',
      facebook: 'AAAAAAA',
      twitter: 'AAAAAAA',
      google: 'AAAAAAA',
      youtube: 'AAAAAAA',
      lastModified: currentDate,
      lastModifiedBy: 'AAAAAAA',
      language: LanguageType.EN,
      appointment: 'AAAAAAA',
      latitude: 0,
      longitude: 0,
      imageContentType: 'image/png',
      image: 'AAAAAAA',
      url: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          lastModified: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Contact', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
          lastModified: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          lastModified: currentDate,
        },
        returnedFromService
      );

      service.create(new Contact()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Contact', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          title: 'BBBBBB',
          address: 'BBBBBB',
          street: 'BBBBBB',
          code: 'BBBBBB',
          city: 'BBBBBB',
          state: 'BBBBBB',
          region: 'BBBBBB',
          country: 'BBBBBB',
          telephone: 'BBBBBB',
          email: 'BBBBBB',
          whatsapp: 'BBBBBB',
          facebook: 'BBBBBB',
          twitter: 'BBBBBB',
          google: 'BBBBBB',
          youtube: 'BBBBBB',
          lastModified: currentDate.format(DATE_TIME_FORMAT),
          lastModifiedBy: 'BBBBBB',
          language: 'BBBBBB',
          appointment: 'BBBBBB',
          latitude: 1,
          longitude: 1,
          image: 'BBBBBB',
          url: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          lastModified: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Contact', () => {
      const patchObject = Object.assign(
        {
          title: 'BBBBBB',
          street: 'BBBBBB',
          region: 'BBBBBB',
          country: 'BBBBBB',
          google: 'BBBBBB',
          language: 'BBBBBB',
          latitude: 1,
        },
        new Contact()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          lastModified: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Contact', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          title: 'BBBBBB',
          address: 'BBBBBB',
          street: 'BBBBBB',
          code: 'BBBBBB',
          city: 'BBBBBB',
          state: 'BBBBBB',
          region: 'BBBBBB',
          country: 'BBBBBB',
          telephone: 'BBBBBB',
          email: 'BBBBBB',
          whatsapp: 'BBBBBB',
          facebook: 'BBBBBB',
          twitter: 'BBBBBB',
          google: 'BBBBBB',
          youtube: 'BBBBBB',
          lastModified: currentDate.format(DATE_TIME_FORMAT),
          lastModifiedBy: 'BBBBBB',
          language: 'BBBBBB',
          appointment: 'BBBBBB',
          latitude: 1,
          longitude: 1,
          image: 'BBBBBB',
          url: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          lastModified: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Contact', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addContactToCollectionIfMissing', () => {
      it('should add a Contact to an empty array', () => {
        const contact: IContact = { id: 'ABC' };
        expectedResult = service.addContactToCollectionIfMissing([], contact);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contact);
      });

      it('should not add a Contact to an array that contains it', () => {
        const contact: IContact = { id: 'ABC' };
        const contactCollection: IContact[] = [
          {
            ...contact,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addContactToCollectionIfMissing(contactCollection, contact);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Contact to an array that doesn't contain it", () => {
        const contact: IContact = { id: 'ABC' };
        const contactCollection: IContact[] = [{ id: 'CBA' }];
        expectedResult = service.addContactToCollectionIfMissing(contactCollection, contact);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contact);
      });

      it('should add only unique Contact to an array', () => {
        const contactArray: IContact[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'e7b80230-af0a-4ea9-8d02-10019213c9b0' }];
        const contactCollection: IContact[] = [{ id: 'ABC' }];
        expectedResult = service.addContactToCollectionIfMissing(contactCollection, ...contactArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contact: IContact = { id: 'ABC' };
        const contact2: IContact = { id: 'CBA' };
        expectedResult = service.addContactToCollectionIfMissing([], contact, contact2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contact);
        expect(expectedResult).toContain(contact2);
      });

      it('should accept null and undefined values', () => {
        const contact: IContact = { id: 'ABC' };
        expectedResult = service.addContactToCollectionIfMissing([], null, contact, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contact);
      });

      it('should return initial array if no Contact is added', () => {
        const contactCollection: IContact[] = [{ id: 'ABC' }];
        expectedResult = service.addContactToCollectionIfMissing(contactCollection, undefined, null);
        expect(expectedResult).toEqual(contactCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
