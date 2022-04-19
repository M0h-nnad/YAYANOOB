import { TestBed } from '@angular/core/testing';

import { TalentGuard } from './talent.guard';

describe('TalentGuard', () => {
  let guard: TalentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TalentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
