import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AboutService } from '../service/about.service';

import { AboutComponent } from './about.component';

describe('About Management Component', () => {
  let comp: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let service: AboutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'about', component: AboutComponent }]), HttpClientTestingModule],
      declarations: [AboutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(AboutComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AboutService);

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
    expect(comp.abouts?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
