import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { ComicDetailComponent } from './components/detail-page/comic-detail/comic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: ':id',
    component: DetailPageComponent
  },
  {
    path: ':id/:comicId',
    component: ComicDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
