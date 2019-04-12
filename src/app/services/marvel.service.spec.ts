import { TestBed, async } from '@angular/core/testing';

import { MarvelService } from './marvel.service';
import { HttpClientModule } from '@angular/common/http';
import { defer } from 'rxjs';
import { getAllHeroesResponse } from '../data/getAllHeroes';
import { getComicsResponse } from '../data/getComics';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('MarvelService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let marvelService: MarvelService;
  const heroId = '1011334';
  const comicId = '22506';
  const comicURL = 'http://gateway.marvel.com/v1/public/characters/1011334/comics';
  const totalComics = 12;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    marvelService = new MarvelService(httpClientSpy as any);
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: MarvelService = TestBed.get(MarvelService);
    expect(service).toBeTruthy();
  });

  it('should return expected data when calling getAllHeroes (HttpClient called once)', () => {
    const expectedResponse = getAllHeroesResponse;
    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    marvelService.getAllHeroes().subscribe(
      res => expect(res).toEqual(getAllHeroesResponse.data, 'expected data'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected hero when calling getHeroById(HttpClient called once)', () => {
    const expectedResponse = getAllHeroesResponse;
    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    marvelService.getHeroById(heroId).subscribe(
      res => expect(res).toEqual(getAllHeroesResponse.data.results[0], 'expected data'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected hero comic when calling getHeroComicById(HttpClient called once)', () => {
    const expectedResponse = getAllHeroesResponse;
    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    marvelService.getHeroComicById(comicId).subscribe(
      res => expect(res).toEqual(getAllHeroesResponse.data.results[0], 'expected data'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected hero comic when calling getHeroComics(HttpClient called once)', () => {
    const expectedResponse = getComicsResponse;
    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    marvelService.getHeroComics(comicURL, totalComics, 1).subscribe(
      res => expect(res).toEqual(getComicsResponse.data, 'expected data'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected hero comic when calling getHeroComics(HttpClient called once)', () => {
    const expectedResponse = getComicsResponse;
    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    marvelService.getHeroComics(comicURL, totalComics).subscribe(
      res => expect(res).toEqual(getComicsResponse.data, 'expected data'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
