import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Rovers } from "../models/rovers.enum";
import { SolCameraData } from "../models/sol-camera-data";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RoverData } from '../models/rover-data';

@Injectable({
  providedIn: 'root'
})
export class NASAService {
  private api_key: string = "S43c9bH3x5tdLI6sYUDCb4lmtJuzoFMDGC5Q6bXk";
  constructor(private http: HttpClient) { }

  public getSolData(rover: Rovers): Observable<SolCameraData> {
    let manifestURL = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${this.api_key}`
    return this.http.get(manifestURL)
      .pipe(map(res => {
        // sols are not 1 to 1 to array indexes some sols are missing
        let photos: any[] = res['photo_manifest']['photos']
        let solCamData = {};
        for (let i = 0; i < photos.length; i++) {
          solCamData[photos[i].sol] = photos[i];
        }
        return (solCamData as SolCameraData);
      }));
  }

  public getRoverData(rover: Rovers): Observable<RoverData> {
    let roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/`;
    let httpParams: HttpParams = new HttpParams({ fromObject: { api_key: this.api_key } })
    return this.http.get(roverURL, { params: httpParams }).pipe(map(res => {
      return (res['rover'] as RoverData)
    }));
  }
}

