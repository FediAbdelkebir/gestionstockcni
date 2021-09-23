import { TestBed } from '@angular/core/testing';

import { SousFamilleService } from './sous-famille.service';

describe('SousFamilleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SousFamilleService = TestBed.get(SousFamilleService);
    expect(service).toBeTruthy();
  });
});
