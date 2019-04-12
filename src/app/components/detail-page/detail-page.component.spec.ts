import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { LoadingComponent } from '../common/loading/loading.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MarvelService } from 'src/app/services/marvel.service';
import { of } from 'rxjs';
import { AppConfig } from 'src/app/configs';
import { getComicsResponse } from 'src/app/data/getComics';
import { getAllHeroesResponse } from 'src/app/data/getAllHeroes';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let marvelService: MarvelService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPageComponent, LoadingComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        InfiniteScrollModule
      ],
      providers: [MarvelService]
    })
    .compileComponents();
  }));

  beforeEach(inject([MarvelService], service => {
    marvelService = service;
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.offset = 0;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroDetail function and get the heroDetail', () => {
    const reponse = getAllHeroesResponse.data.results[0];
    const listHeroComic = getComicsResponse.data;
    component.page = 1000;

    spyOn(marvelService, 'getHeroById').and.returnValue(of(reponse));
    spyOn(marvelService, 'getHeroComics').and.returnValue(of(listHeroComic));
    component.getHeroDetail();
    fixture.detectChanges();

    expect(component.heroDetail).toEqual(reponse);
    expect(component.offset).toEqual(AppConfig.LIMIT);
    expect(component.comics).toEqual(listHeroComic.results);
    expect(component.hasMoreComics).toBeFalsy();
  });

  it('should show loading when calling onscroll', () => {
    const getHeroComicsResponse = getComicsResponse.data;
    component.comics = [];
    component.heroDetail = getAllHeroesResponse.data.results[0];
    component.isLoading = false;

    spyOn(marvelService, 'getHeroComics').and.returnValue(of(getHeroComicsResponse));
    component.onScroll();
    fixture.detectChanges();

    expect(component.comics).toEqual([].concat(getHeroComicsResponse.results));
  });

  it('should not call getComics when calling function onScroll if component is loading', () => {
    component.isLoading = true;
    component.onScroll();
    spyOn(component, 'getComics');
    fixture.detectChanges();

    expect(component.getComics).toHaveBeenCalledTimes(0);
  });
});
