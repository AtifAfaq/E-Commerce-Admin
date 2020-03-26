import { TestBed } from '@angular/core/testing';

import { DataShiftingService } from './data-shifting.service';

describe('DataShiftingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataShiftingService = TestBed.get(DataShiftingService);
    expect(service).toBeTruthy();
  });
});
