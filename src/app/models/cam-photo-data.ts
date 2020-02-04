import { RoverCameras } from './rover-data';

export interface CamPhotoData {
    name?: RoverCameras,
    numOfPhotos: number,
    sampleImg?: string,
}
