import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    expect(service).toBeTruthy();
  });
});
