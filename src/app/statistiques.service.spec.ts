import { TestBed } from '@angular/core/testing';

import { StatistiquesService } from './statistiques.service';

describe('StatistiquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatistiquesService = TestBed.get(StatistiquesService);
    expect(service).toBeTruthy();
  });
});
