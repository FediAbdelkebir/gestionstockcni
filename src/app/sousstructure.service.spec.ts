import { TestBed } from '@angular/core/testing';

import { SousstructureService } from './sousstructure.service';

describe('SousstructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SousstructureService = TestBed.get(SousstructureService);
    expect(service).toBeTruthy();
  });
});
