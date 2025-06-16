import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FaqCategoryService } from '../service/faq-category.service';

import { FaqCategoryComponent } from './faq-category.component';

describe('FaqCategory Management Component', () => {
  let comp: FaqCategoryComponent;
  let fixture: ComponentFixture<FaqCategoryComponent>;
  let service: FaqCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'faq-category', component: FaqCategoryComponent }]), HttpClientTestingModule],
      declarations: [FaqCategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(FaqCategoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FaqCategoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FaqCategoryService);

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
    expect(comp.faqCategories?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
