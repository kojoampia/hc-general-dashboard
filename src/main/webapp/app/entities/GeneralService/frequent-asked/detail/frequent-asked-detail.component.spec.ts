import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FrequentAskedDetailComponent } from './frequent-asked-detail.component';

describe('FrequentAsked Management Detail Component', () => {
  let comp: FrequentAskedDetailComponent;
  let fixture: ComponentFixture<FrequentAskedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequentAskedDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ frequentAsked: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(FrequentAskedDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FrequentAskedDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load frequentAsked on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.frequentAsked).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
