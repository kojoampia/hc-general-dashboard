import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFaqCategory, FaqCategory } from '../faq-category.model';
import { FaqCategoryService } from '../service/faq-category.service';

import { FaqCategoryRoutingResolveService } from './faq-category-routing-resolve.service';

describe('FaqCategory routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FaqCategoryRoutingResolveService;
  let service: FaqCategoryService;
  let resultFaqCategory: IFaqCategory | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(FaqCategoryRoutingResolveService);
    service = TestBed.inject(FaqCategoryService);
    resultFaqCategory = undefined;
  });

  describe('resolve', () => {
    it('should return IFaqCategory returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFaqCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFaqCategory).toEqual({ id: 'ABC' });
    });

    it('should return new IFaqCategory if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFaqCategory = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFaqCategory).toEqual(new FaqCategory());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as FaqCategory })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFaqCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFaqCategory).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
