import { TestBed } from '@angular/core/testing';

import { ProfessionalResolver } from './professional.resolver';

describe('ProfessionalResolver', () => {
  let resolver: ProfessionalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfessionalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
