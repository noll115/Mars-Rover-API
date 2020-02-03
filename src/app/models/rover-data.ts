export enum RoverCameras {
    FHAZ = "FHAZ",
    RHAZ = "RHAZ",
    MAST = "MAST",
    CHEMCAM = "CHEMCAM",
    MAHLI = "MAHLI",
    MARDI = "MARDI",
    NAVCAM = "NAVCAM",
    PANCAM = "PANCAM",
    MINITES = "MINITES"
}


interface CamName {
    name: string,
    full_name: string,
}

export interface CamNames extends Array<CamName> { }

export interface RoverData {
    id: Number,
    name: string,
    landing_date: string,
    launch_date: string,
    status: string,
    max_sol: number,
    max_date: string,
    total_photos: Number,
    cameras: CamNames
}