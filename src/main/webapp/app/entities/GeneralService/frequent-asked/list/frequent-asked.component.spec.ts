import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FrequentAskedService } from '../service/frequent-asked.service';

import { FrequentAskedComponent } from './frequent-asked.component';

describe('FrequentAsked Management Component', () => {
  let comp: FrequentAskedComponent;
  let fixture: ComponentFixture<FrequentAskedComponent>;
  let service: FrequentAskedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'frequent-asked', component: FrequentAskedComponent }]), HttpClientTestingModule],
      declarations: [FrequentAskedComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(FrequentAskedComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FrequentAskedComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FrequentAskedService);

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
    expect(comp.frequentAskeds?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
