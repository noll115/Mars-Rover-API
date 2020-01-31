interface RoverCams {
    name: string,
    full_name: string,
}

export interface RoverData {
    id: Number,
    name: string,
    landing_date: string,
    launch_date: string,
    status: string,
    max_sol: number,
    max_date: string,
    total_photos: Number,
    cameras: RoverCams[]
}