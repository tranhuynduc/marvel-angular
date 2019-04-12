import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ComicDetailComponent } from './comic-detail.component';
import { LoadingComponent } from '../../common/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarvelService } from 'src/app/services/marvel.service';
import { of } from 'rxjs';
import { getComicsResponse } from 'src/app/data/getComics';

describe('ComicDetailComponent', () => {
  let component: ComicDetailComponent;
  let fixture: ComponentFixture<ComicDetailComponent>;
  let marvelService: MarvelService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicDetailComponent, LoadingComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        InfiniteScrollModule
      ],
      providers: [
        MarvelService
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([MarvelService], service => {
    marvelService = service;
    fixture = TestBed.createComponent(ComicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroComicById and return a HeroComic', () => {
    const response = getComicsResponse.data.results[0];

    spyOn(marvelService, 'getHeroComicById').and.returnValue(of(response));
    component.getHeroComicById();

    fixture.detectChanges();

    expect(component.selectedComic).toEqual(response);
  });
});
