import { Component, OnInit, Input } from '@angular/core';
import { RoverCameras, CamNames } from 'src/app/models/rover-data';
import { CamPhotoData } from 'src/app/models/cam-photo-data';
import { Observer, Subscription, Subject, Observable, forkJoin } from 'rxjs';
import { SolPayload } from 'src/app/models/sol-camera-data';
import { NASAService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})


export class PhotoGridComponent implements OnInit {
  private _camData: Map<String, CamPhotoData>;
  private _currentReq: Subscription;
  newDataEmitter: Subject<Function> = new Subject();
  private _selectedCams: CamNames = [];
  @Input()
  set selectedCams(cams: CamNames) {
    this._selectedCams = cams;
    this.OrderCams();
  }
  get selectedCams(): CamNames {
    return this._selectedCams
  }
  @Input() currentSol: number = 0;
  loading: boolean = true;
  orderedCams: CamNames = this._selectedCams;
  camsUsed = [];
  @Input()
  set camsOnSol(payload: SolPayload) {
    if (!payload) return;
    this.loading = true;
    let { camsUsed, sol } = payload;
    this.camsUsed = camsUsed;
    //choose new sol so query for pictures and reset all cards
    this.CancelAllRequests();
    //.clear() was not working for unknown reason as old keys were still in map
    this._camData = new Map();
    let requests = []
    for (const cam of camsUsed) {
      let reqSub = this.NASAService.getPhotos(sol, cam)
      requests.push(reqSub);
    }
    this.OrderCams();
    this._currentReq = forkJoin(requests).subscribe(this.camDataObserver);
  }
  

  camDataObserver: Observer<CamPhotoData[]> = {
    next: camDatas => {
      for (const camData of camDatas) {
        this._camData[camData.name] = camData
      }
    },
    error: err => console.error(err),
    complete: () => {
      this.newDataEmitter.next(this.GetCamData)
      this.loading = false;
    }
  }
  constructor(private NASAService: NASAService) { }
  
  ngOnInit() {
    
  }

  GetCamData = (roverCam: RoverCameras): CamPhotoData => {
    return this._camData[roverCam] || { numOfPhotos: 0 };
  }
  
  CancelAllRequests() {
    if (this._currentReq)
    this._currentReq.unsubscribe();
  }
  
  OrderCams() {
    //reorder cameras to display ones with images first
    let cams = this.selectedCams.filter(({ name }) => this.camsUsed.includes(name as RoverCameras));
    this.orderedCams = [...new Set(cams.concat(this.selectedCams))]
  }

}
