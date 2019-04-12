import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  spinnerGif = `${environment.thumbnailURL}/spinner.gif`;
  constructor() { }

  ngOnInit() {
  }

}
