import { RoverCameras } from './rover-data';

export interface SolCameraData {
    [sol: number]: {
        sol: number,
        earth_date: string,
        total_photos: number,
        cameras: RoverCameras[]
    }
}
export interface SolPayload{
    sol:number,
    camsUsed:RoverCameras[]
}