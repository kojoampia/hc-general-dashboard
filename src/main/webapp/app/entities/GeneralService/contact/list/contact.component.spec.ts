import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContactService } from '../service/contact.service';

import { ContactComponent } from './contact.component';

describe('Contact Management Component', () => {
  let comp: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'contact', component: ContactComponent }]), HttpClientTestingModule],
      declarations: [ContactComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(ContactComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ContactService);

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
    expect(comp.contacts?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
