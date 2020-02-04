import { Component, OnInit } from '@angular/core';
import { Observer, forkJoin } from 'rxjs';
import { RoverData, CamNames, RoverCameras } from "./models/rover-data";
import { Rovers } from "./models/rovers.enum";
import { NASAService } from './services/nasa.service';
import { SolCameraData, SolPayload } from './models/sol-camera-data';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  roverData: RoverData;
  usableCameras: CamNames = [];
  selectedRover: Rovers = Rovers.Curiosity;
  solCamData: SolCameraData = {};
  usedCamsOnSol: SolPayload;
  selectedCams: CamNames = [];


  private dataObserver: Observer<[RoverData, SolCameraData]> = {
    next: ([roverData, solCameraData]) => {
      this.roverData = roverData;
      this.solCamData = solCameraData;
      this.usableCameras = roverData.cameras;
      this.selectedCams = [...roverData.cameras];
    },
    error: (err: any) => console.error(err),
    complete: () => this.setSol(0)
  }

  constructor(private nasaService: NASAService) {
  }


  setSol(sol: number) {
    let camData = this.solCamData[sol];
    if (camData !== undefined) {
      this.usedCamsOnSol = { sol, camsUsed: camData.cameras };
    }
    else {
      this.usedCamsOnSol = { sol, camsUsed: [] };
    }
  }


  OnCameraSelection(CamerasSelected: CamNames) {
    this.selectedCams = CamerasSelected;
  }

  ngOnInit(): void {
    let roverQuery = this.nasaService.getRoverData();
    let solQuery = this.nasaService.getSolData();
    forkJoin<RoverData, SolCameraData>([roverQuery, solQuery]).subscribe(this.dataObserver);
  }


}
