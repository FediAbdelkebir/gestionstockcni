import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorServiceService } from './auth-http-interceptor-service.service';

describe('AuthHttpInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHttpInterceptorServiceService = TestBed.get(AuthHttpInterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
