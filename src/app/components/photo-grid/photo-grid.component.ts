import { Component, OnInit, Input } from '@angular/core';
import { RoverCameras, CamNames } from 'src/app/models/rover-data';
import { CamPhotoData } from 'src/app/models/cam-photo-data';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
//Should just display data
export class PhotoGridComponent implements OnInit {
  @Input() selectedCams: CamNames;
  private _camData: Map<RoverCameras, CamPhotoData> = new Map();
  private _camOnSol: string[];
  @Input()
  set camsOnSol(cams: string[]) {
    this._camOnSol = cams;
    //choose new sol so query for pictures and reset all cards
  }
  constructor() { }

  ngOnInit() {
    
  }

  GetCamData(roverCam: RoverCameras) {
    return this._camData[roverCam] || { numOfPhotos: 0 };
  }


}
