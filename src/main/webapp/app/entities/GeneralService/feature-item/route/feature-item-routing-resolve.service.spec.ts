import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFeatureItem, FeatureItem } from '../feature-item.model';
import { FeatureItemService } from '../service/feature-item.service';

import { FeatureItemRoutingResolveService } from './feature-item-routing-resolve.service';

describe('FeatureItem routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FeatureItemRoutingResolveService;
  let service: FeatureItemService;
  let resultFeatureItem: IFeatureItem | undefined;

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
    routingResolveService = TestBed.inject(FeatureItemRoutingResolveService);
    service = TestBed.inject(FeatureItemService);
    resultFeatureItem = undefined;
  });

  describe('resolve', () => {
    it('should return IFeatureItem returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFeatureItem = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFeatureItem).toEqual({ id: 'ABC' });
    });

    it('should return new IFeatureItem if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFeatureItem = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFeatureItem).toEqual(new FeatureItem());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as FeatureItem })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFeatureItem = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFeatureItem).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
