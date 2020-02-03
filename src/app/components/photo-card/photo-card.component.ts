import { Component, OnInit, Input } from '@angular/core';
import { CamPhotoData } from 'src/app/models/cam-photo-data';
import { CamNames } from 'src/app/models/rover-data';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {
  @Input() label: string;
  @Input() cardData: CamPhotoData;

  constructor() { }

  ngOnInit() {
    console.log(this.cardData);
    
  }

}
