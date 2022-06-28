import { TestBed } from '@angular/core/testing';

import { MetaGuard } from './meta.guard';

describe('MetaGuard', () => {
  let guard: MetaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MetaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
