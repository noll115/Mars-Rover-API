import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CamNames } from 'src/app/models/rover-data';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit {
  private _choices: CamNames;


  @Input()
  set choices(inChoices: CamNames) {
    this.chosenArray = [...inChoices];
    this._choices = inChoices;
    this.numOfChoicesChosen = this.choices.length;
  }
  get choices(): CamNames {
    return this._choices;
  }


  @Input() label: string;
  @Input() boxText: string;
  @Output() selected = new EventEmitter<CamNames>();
  numOfChoicesChosen: number;
  dropDown: boolean = false;
  chosenArray: CamNames;

  constructor() { }

  ngOnInit() {
  }

  //display choices
  DropMenu() {
    this.dropDown = !this.dropDown;
  }

  ChoiceSelect(index: number, event) {
    if (event.target.tagName === "INPUT") {
      let newElement = this.choices[index];
      let arrIndex = this.chosenArray.indexOf(newElement);
      if (arrIndex !== -1) {
        //have to reassign array bc angular detects changes based on reference 
        this.chosenArray = this.chosenArray.filter((_, index) => index !== arrIndex);
      } else {
        this.chosenArray = this._choices.filter((camName) => {
          if (this.chosenArray.includes(camName) || camName == newElement) {
            return camName;
          }
        });
      }
      this.numOfChoicesChosen = this.chosenArray.length;
      this.selected.emit(this.chosenArray);
    }
  }

  isChecked(index: number) {
    return this.chosenArray.includes(this.choices[index]);
  }
  ClearSelection() {
    this.numOfChoicesChosen = 0;
    this.chosenArray = [];
    this.selected.emit(this.chosenArray);
  }
  SelectAll() {
    this.chosenArray = [...this.choices];
    this.numOfChoicesChosen = this.chosenArray.length;
    this.selected.emit(this.chosenArray);
  }
}
