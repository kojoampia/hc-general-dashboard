import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FeatureItemService } from '../service/feature-item.service';

import { FeatureItemComponent } from './feature-item.component';

describe('FeatureItem Management Component', () => {
  let comp: FeatureItemComponent;
  let fixture: ComponentFixture<FeatureItemComponent>;
  let service: FeatureItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'feature-item', component: FeatureItemComponent }]), HttpClientTestingModule],
      declarations: [FeatureItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(FeatureItemComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeatureItemComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FeatureItemService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.featureItems?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
