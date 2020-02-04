import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Rovers } from "../models/rovers.enum";
import { SolCameraData } from "../models/sol-camera-data";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RoverData, RoverCameras } from '../models/rover-data';
import { CamPhotoData } from '../models/cam-photo-data';

@Injectable({
  providedIn: 'root'
})
export class NASAService {
  private api_key: string = "DEMO_KEY";
  constructor(private http: HttpClient) { }

  public getSolData(): Observable<SolCameraData> {
    let manifestURL = `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity`
    let params: HttpParams = new HttpParams({ fromObject: { api_key: this.api_key } })
    return this.http.get(manifestURL, { params })
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

  public getRoverData(): Observable<RoverData> {
    let roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/`;
    let params: HttpParams = new HttpParams({ fromObject: { api_key: this.api_key } })
    return this.http.get(roverURL, { params }).pipe(map(res => {
      return (res['rover'] as RoverData)
    }));
  }
  //should only be called when there are photos
  public getPhotos(sol: number, camera: RoverCameras): Observable<CamPhotoData> {
    let photoURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`
    let params: HttpParams = new HttpParams({ fromObject: { api_key: this.api_key, sol: sol.toString(), camera } })
    return this.http.get(photoURL, { params }).pipe(map(res => {
      let photos: any[] = res['photos'];
      let camData: CamPhotoData = {
        name: photos[0]['camera']['name'],
        numOfPhotos: photos.length,
        sampleImg: photos[0]['img_src']
      };
      return camData;
    }));
  }
}

