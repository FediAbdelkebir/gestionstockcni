import { TestBed } from '@angular/core/testing';

import { MagasinServiceService } from './magasin-service.service';

describe('MagasinServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MagasinServiceService = TestBed.get(MagasinServiceService);
    expect(service).toBeTruthy();
  });
});
