import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { LoadingComponent } from '../common/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarvelService } from 'src/app/services/marvel.service';
import { of } from 'rxjs';
import { AppConfig } from 'src/app/configs';
import { getAllHeroesResponse } from 'src/app/data/getAllHeroes';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let marvelService: MarvelService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, LoadingComponent ],
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
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.offset = 0;
    component.page = 200;
    component.hasMoreHeroes = true;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllHeroes and return a list of heroes', () => {
    const response = getAllHeroesResponse.data;

    spyOn(marvelService, 'getAllHeroes').and.returnValue(of(response));
    component.getHeroes();

    fixture.detectChanges();

    expect(component.hasMoreHeroes).toBeFalsy();
    expect(component.offset).toEqual(AppConfig.LIMIT);
    expect(component.heroes).toEqual(response.results);
    expect(component.isLoading).toBeFalsy();
  });

  it('should call getAllHeroes and concat to a list of heroes when heroes is avaiable', () => {
    const response =  getAllHeroesResponse.data;
    const currentHeroes = [];
    component.heroes = currentHeroes;

    spyOn(marvelService, 'getAllHeroes').and.returnValue(of(response));
    component.getHeroes();

    fixture.detectChanges();
    expect(component.heroes).toEqual(currentHeroes.concat(response.results));
  });

  it('should show loading when calling onscroll', () => {
    component.isLoading = false;
    component.onScroll();
    fixture.detectChanges();

    expect(component.isLoading).toBeTruthy();
  });

  it('should not call getHeroes when calling function onScroll if component is loading', () => {
    component.isLoading = true;
    component.onScroll();
    spyOn(component, 'getHeroes');
    fixture.detectChanges();

    expect(component.getHeroes).toHaveBeenCalledTimes(0);
  });
});
