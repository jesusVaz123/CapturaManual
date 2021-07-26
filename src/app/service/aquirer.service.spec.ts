import { TestBed } from '@angular/core/testing';

import { AquirerService } from './aquirer.service';

describe('AquirerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AquirerService = TestBed.get(AquirerService);
    expect(service).toBeTruthy();
  });
});
