import { TestBed } from '@angular/core/testing';

import { FamilleService } from './famille.service';

describe('FamilleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilleService = TestBed.get(FamilleService);
    expect(service).toBeTruthy();
  });
});
