import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FeatureService } from '../service/feature.service';

import { FeatureComponent } from './feature.component';

describe('Feature Management Component', () => {
  let comp: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let service: FeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'feature', component: FeatureComponent }]), HttpClientTestingModule],
      declarations: [FeatureComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(FeatureComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FeatureService);

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
    expect(comp.features?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
