import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../configs';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  heroDetail: any = null;
  comics: any = null;
  thumbnailPath = '';
  AppConfig = AppConfig;
  comicsURI = '';
  page = 1;
  count = 0;
  offset = 0;
  isLoading = false;
  hasMoreComics = true;
  constructor(
    private marvelService: MarvelService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getHeroDetail();
  }

  getHeroDetail() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.marvelService.getHeroById(id).subscribe(res => {
      if (res) {
        this.heroDetail = res;
        this.thumbnailPath = this.marvelService.getThumbnailPath(res.thumbnail.path, res.thumbnail.extension);
        this.comicsURI = res.comics.collectionURI;
        this.getComics();
      }
    });
  }

  getComics() {
    const total = this.heroDetail.comics.available;
    this.marvelService.getHeroComics(this.comicsURI, total, this.offset).subscribe(res => {
      this.offset += AppConfig.LIMIT;
      if (res.results) {
        this.comics = this.comics ? this.comics.concat(res.results) : res.results;
      }
      if (this.page * AppConfig.LIMIT >= res.total) {
        this.hasMoreComics = false;
      }
      this.isLoading = false;
    });
  }

  onScroll() {
    if (this.isLoading) {
      return true;
    }
    this.isLoading = true;
    this.getComics();
  }

  getThumbnailPath(item) {
    return this.marvelService.getThumbnailPath(item.thumbnail.path, item.thumbnail.extension);
  }
}
