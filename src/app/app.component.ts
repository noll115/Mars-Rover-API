import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observer } from 'rxjs';



interface RoverCams {
  name: string,
  full_name: string,
}

interface RoverData {
  id: Number,
  name: string,
  landing_date: string,
  launch_date: string,
  status: string,
  max_sol: string,
  max_date: string,
  total_photos: Number,
  cameras: RoverCams[]
}

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
  roverData: RoverData;
  roverQuery: HttpParams = new HttpParams();
  selectedRover:RoverNames = RoverNames.Curiosity;

  private roverObserver: Observer<RoverData> = {
    next: data => this.roverData = data,
    error: err => console.error(err),
    complete: () => console.log("DONE")
  }

  private titleObserver: Observer<RoverNames> = {
    next: this.queryRover,
    error: err => console.error(err),
    complete: () => console.log("DONE")
  }

  constructor(private http: HttpClient) {
    this.roverQuery = this.roverQuery.set("api_key", "DEMO_KEY").set("sol", "1000");
  }

  setSol(sol: number) {
    this.roverQuery.set("sol", sol.toString());
  }

  queryRover(roverName: RoverNames) {

    this.selectedRover = roverName;
    let roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/`;
    this.http.get<RoverData>(roverURL, { params: this.roverQuery }).subscribe(this.roverObserver);
  }


  ngOnInit(): void {
    this.queryRover(RoverNames.Curiosity);
  }

}
