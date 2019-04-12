import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppConfig } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  marvelApiUrl = `${environment.marvelApiUrl}/characters`;
  marvelComisUrl = `${environment.marvelApiUrl}/comics`;
  publicKey = AppConfig.PUBLIC_KEY;
  constructor(
    private http: HttpClient
  ) { }

getHash(timeStamp: string): string {
  const hashGenerator: Md5 = new Md5();
  hashGenerator.appendStr(timeStamp);
  hashGenerator.appendStr(AppConfig.PRIVATE_KEY);
  hashGenerator.appendStr(AppConfig.PUBLIC_KEY);
  const hash: string = hashGenerator.end().toString();
  return hash;
}

getTimeStamp(): string {
    return new Date().valueOf().toString();
}

getAllHeroes(offset: number = 10): Observable<any> {
  const timeStamp = this.getTimeStamp();
  const hash = this.getHash(timeStamp);
  const requestUrl = `${this.marvelApiUrl}?limit=${AppConfig.LIMIT}&offset=${offset}&ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
  return this.http.get<any>(requestUrl)
    .pipe(
      map(res => res.data)
    );
  }

  getHeroById(characterId: string): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = `${this.marvelApiUrl}/${characterId}?ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<any>(requestUrl)
      .pipe(
        map(res => res.data.results[0])
      );
  }

  getHeroComics(uri: string, total: number, offset: number = 10): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = `${uri}?limit=${total}&offset=${offset}&ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<any>(requestUrl)
      .pipe(
        map(res => res.data)
      );
  }

  getHeroComicById(id: string): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = `${this.marvelComisUrl}/${id}?ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<any>(requestUrl)
      .pipe(
        map(res => res.data.results[0])
      );
  }

  getThumbnailPath(path: any, extension: any) {
    return `${path}.${extension}`;
  }
}



