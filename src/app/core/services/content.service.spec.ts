import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { Experience } from '../models/experience.model';

describe('ContentService', () => {
  let service: ContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('loads experience entries', (done) => {
    const payload: Experience[] = [
      { company: 'Hahn Software', role: 'Software Engineer & Data Engineer' }
    ];

    service.getExperience().subscribe((result) => {
      expect(result).toEqual(payload);
      done();
    });

    httpMock.expectOne('assets/data/experience.json').flush(payload);
  });

  it('falls back to an empty array when the file fails to load', (done) => {
    spyOn(console, 'error');

    service.getExperience().subscribe((result) => {
      // The old implementation used EMPTY here, which never emits — a missing
      // file left the page hanging on `undefined` forever.
      expect(result).toEqual([]);
      done();
    });

    httpMock
      .expectOne('assets/data/experience.json')
      .flush('nope', { status: 404, statusText: 'Not Found' });
  });
});
