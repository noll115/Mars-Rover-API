import { Component, OnInit, Input } from '@angular/core';
import { CamPhotoData } from 'src/app/models/cam-photo-data';
import { Subject, Observer } from 'rxjs';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() OnNewData: Subject<Function>;
  @Input() cardData: CamPhotoData;
  @Input() loading: boolean;
  private newDataObserver: Observer<Function> = {
    next: GetCardData => {
      this.cardData = GetCardData(this.key);
    },
    error: err => console.error(err),
    complete: null
  }

  constructor() { }

  ngOnInit() {
    this.OnNewData.subscribe(this.newDataObserver);
  }

}
