import { TestBed } from '@angular/core/testing';

import { TalentsService } from './talents.service';

describe('TalentsService', () => {
  let service: TalentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
