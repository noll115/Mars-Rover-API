import { Component, OnInit } from '@angular/core';
import { Observer, forkJoin } from 'rxjs';
import { RoverData } from "./models/rover-data";
import { Rovers } from "./models/rovers.enum";
import { NASAService } from './services/nasa.service';
import { SolCameraData } from './models/sol-camera-data';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  roverData: RoverData;
  usableCameras: string[] = [];
  selectedRover: Rovers = Rovers.Curiosity;
  solCamData: SolCameraData;
  nameToFull: Map<string, string> = new Map<string, string>();


  private dataObserver: Observer<[RoverData, SolCameraData]> = {
    next: ([roverData, solCameraData]) => {
      this.roverData = roverData;
      this.solCamData = solCameraData;
      this.roverData.cameras.forEach(cam => this.nameToFull[cam.name] = cam.full_name);
    },
    error: (err: any) => console.error(err),
    complete: () => null
  }

  constructor(private nasaService: NASAService) {
  }




  setSol(sol: number) {
    let camData = this.solCamData[sol];
    if (camData !== undefined) {
      this.usableCameras = camData.cameras.map(cam => this.nameToFull[cam]);
    }
    else {
      this.usableCameras = [];
    }
  }


  OnCameraSelection(CamerasSelected: string[]) {
    console.log(CamerasSelected);

  }

  ngOnInit(): void {
    let roverQuery = this.nasaService.getRoverData(this.selectedRover);
    let solQuery = this.nasaService.getSolData(this.selectedRover);
    forkJoin<RoverData, SolCameraData>([roverQuery, solQuery]).subscribe(this.dataObserver);
  }

}
