import { TestBed } from '@angular/core/testing';

import { FournisseurServiceService } from './fournisseur-service.service';

describe('FournisseurServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FournisseurServiceService = TestBed.get(FournisseurServiceService);
    expect(service).toBeTruthy();
  });
});
