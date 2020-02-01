import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observer } from 'rxjs';
import { RoverData } from "./models/rover-data";

enum RoverNames {
  Curiosity = "Curiosity",
  Opportunity = "Opportunity",
  Spirit = "Spirit"
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  roverData: RoverData = {
    "id": 5, "name": "Curiosity",
    "landing_date": "2012-08-06",
    "launch_date": "2011-11-26",
    "status": "active",
    "max_sol": 2540,
    "max_date": "2019-09-28",
    "total_photos": 366206,
    "cameras": [
      { "name": "FHAZ", "full_name": "Front Hazard Avoidance Camera" },
      { "name": "NAVCAM", "full_name": "Navigation Camera" },
      { "name": "MAST", "full_name": "Mast Camera" },
      { "name": "CHEMCAM", "full_name": "Chemistry and Camera Complex" },
      { "name": "MAHLI", "full_name": "Mars Hand Lens Imager" },
      { "name": "MARDI", "full_name": "Mars Descent Imager" },
      { "name": "RHAZ", "full_name": "Rear Hazard Avoidance Camera" }
    ]
  };
  usableCameras: string[] = ["Front Hazard Avoidance Camera","Front Hazard Avoidance Camera","Front Hazard Avoidance Camera","Front Hazard Avoidance Camera","Front Hazard Avoidance Camera","Front Hazard Avoidance Camera", "Navigation Camera"];
  selectedRover: RoverNames = RoverNames.Curiosity;
  roverQuery: HttpParams = new HttpParams({
    fromObject: {
      api_key: "S43c9bH3x5tdLI6sYUDCb4lmtJuzoFMDGC5Q6bXk",
      sol: "1000"
    }
  });

  private roverObserver: Observer<RoverData> = {
    next: (data: any) => {
      let rover: RoverData = data['rover'];
      this.roverData = Object.assign({}, rover);
      this.usableCameras = rover.cameras.map(({ full_name }) => full_name);
    },
    error: (err: any) => console.error(err),
    complete: () => null
  }

  constructor(private http: HttpClient) {
  }

  private titleObserver: Observer<RoverNames> = {
    next: this.queryRover,
    error: err => console.error(err),
    complete: () => console.log("DONE")
  }

  setSol(sol: number) {
    this.roverQuery.set("sol", sol.toString());
  }

  queryRover(roverName: RoverNames) {
    this.selectedRover = roverName;
    let roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/`;
    // this.http.get(roverURL, { params: this.roverQuery }).subscribe(this.roverObserver);
  }


  ngOnInit(): void {
    this.queryRover(RoverNames.Curiosity);
  }

}
