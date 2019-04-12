import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {
  selectedComic: {} = null;
  thumbnailPath = '';
  constructor(
    private marvelService: MarvelService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getHeroComicById();
  }

  getHeroComicById() {
    const id = this.activatedRoute.snapshot.paramMap.get('comicId');
    this.marvelService.getHeroComicById(id).subscribe(res => {
      this.selectedComic = res;
      this.thumbnailPath = this.marvelService.getThumbnailPath(res.thumbnail.path, res.thumbnail.extension);
    });
  }
}
